export default function Logout() {
  return (
    <form action="/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  );
}
