import { useRouter } from 'next/router';

const Menu = () => {
  const router = useRouter();
  return (
    <nav className={`menu ${router.query.menu === 'true' ? 'is-active' : ''}`}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>The Crisol Spirit</li>
        <li>Classes</li>
        <li>A bit of history</li>
        <li>Media</li>
        <li>Crisol Book</li>
        <li>Teachers</li>
        <li>Teachers Annuary</li>
        <li>Accommodation</li>
        <li>Support us</li>
        <li>Contact</li>
        <li>Registration</li>
      </ul>
      <style jsx>{`
        .menu {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: calc(0 + 83px);
          left: 100vw;
          background-color: gray;
          z-index: 90;
          color: white;

          transition: left 0.5s ease-in-out;

          &.is-active {
            left: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Menu;
