import { useState, useEffect } from 'react';
import type { UserItem, UserDetails } from '../types/user';

interface DetailsProps {
    info: UserItem | null;
}

const BASE_URL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data';

export const Details = ({ info }: DetailsProps) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!info) return;

        let isMounted = true;

        // Очищаем старые данные и включаем лоадер при смене пользователя
        setUser(null);
        setLoading(true);
        setError(null);

        fetch(`${BASE_URL}/${info.id}.json`)
            .then((res) => {
                if (!res.ok) throw new Error('Не удалось загрузить детали');
                return res.json();
            })
            .then((data: UserDetails) => {
                if (isMounted) setUser(data);
            })
            .catch((err) => {
                if (isMounted) setError(err instanceof Error ? err.message : 'Ошибка');
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [info?.id]);

    if (!info) return null;

    if (loading) {
        return (
            <div className="details-card status-box">
                <div className="spinner"></div>
                <span>Загрузка...</span>
            </div>
        );
    }

    if (error) {
        return <div className="details-card error-box">{error}</div>;
    }

    if (!user) return null;

    return (
        <div className="details-card">
            <img
                key={info.id}
                src={`${user.avatar}?u=${info.id}`}
                alt={user.name}
                onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d6efd&color=fff&size=300`;
                }}
            />
            <div className="details-row details-name">{user.name}</div>
            <div className="details-row">City: {user.details.city}</div>
            <div className="details-row">Company: {user.details.company}</div>
            <div className="details-row">Position: {user.details.position}</div>
        </div>
    );
};