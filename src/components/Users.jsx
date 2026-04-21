const Users = ({ users }) => {
  return (
    <aside className="flex gap-2 lg:block lg:space-y-2">
      {users.map((user) => (
        <div key={user.id} className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm lg:w-full">
          {user.name}
        </div>
      ))}
    </aside>
  );
};

export default Users;
