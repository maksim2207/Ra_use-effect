import { useState, useEffect } from 'react';
import type { UserItem } from './types/user';
import { List } from './components/List';
import { Details } from './components/Details';
import './App.css';

const USERS_URL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json';

export default function App() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(USERS_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка загрузки списка пользователей');
        }
        return res.json();
      })
      .then((data: UserItem[]) => {
        setUsers(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectUser = (user: UserItem) => {
    // Повторный клик по тому же пользователю ничего не делает
    if (selectedUser?.id === user.id) return;
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <div className="column">
        <List
          users={users}
          selectedId={selectedUser?.id ?? null}
          onSelectUser={handleSelectUser}
          loading={loading}
          error={error}
        />
      </div>
      <div className="column">
        <Details info={selectedUser} />
      </div>
    </div>
  );
}