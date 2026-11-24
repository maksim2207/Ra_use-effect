import type { UserItem } from '../types/user';

interface ListProps {
    users: UserItem[];
    selectedId: number | null;
    onSelectUser: (user: UserItem) => void;
    loading: boolean;
    error: string | null;
}

export const List = ({ users, selectedId, onSelectUser, loading, error }: ListProps) => {
    if (loading) {
        return <div className="loading-box">Загрузка списка пользователей...</div>;
    }

    if (error) {
        return <div className="error-box">{error}</div>;
    }

    return (
        <ul className="user-list">
            {users.map((user) => (
                <li
                    key={user.id}
                    className={`user-list-item ${user.id === selectedId ? 'active' : ''}`}
                    onClick={() => onSelectUser(user)}
                >
                    {user.name}
                </li>
            ))}
        </ul>
    );
};