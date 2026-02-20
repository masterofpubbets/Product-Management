// @mui
import Box from '@mui/material/Box';
//
import UserCard from './UserCard';

// ----------------------------------------------------------------------

export default function UserCardList({ users, onDelete, onEdit }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} onEdit={onEdit}/>
      ))}
    </Box>
  );
}

