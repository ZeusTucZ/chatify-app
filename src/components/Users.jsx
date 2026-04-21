const Users = ({ users }) => {
  return (
    <aside className="space-y-2">
      {users.map((user) => (
        <div key={user.id} className="rounded-xl border border-slate-300 px-3 py-2">
          {user.name}
        </div>
      ))}
    </aside>
  );
};

export default Users;