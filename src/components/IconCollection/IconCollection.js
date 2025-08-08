export default function IconCollection({ name }) {
  switch (name) {
    case 'phone':
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.9935 20.4631L20.6552 18.7967C21.1144 18.337 21.1144 17.5906 20.6552 17.1303L17.3317 14.6308C16.7695 14.2492 16.1291 14.171 15.67 14.6308L14.6527 15.651C13.6394 14.8948 12.5347 13.9869 11.5156 12.965C10.3634 11.8093 9.316 10.5239 8.4556 9.3682L9.43817 8.38215C9.89732 7.92242 9.81974 7.28031 9.43817 6.71578L6.94556 3.38303C6.56052 2.82429 5.74297 2.92272 5.28382 3.38303L3.62265 5.0494C2.70435 5.97002 2.99849 7.16682 3.62265 8.38215C3.62265 8.38215 5.68159 12.0606 8.82211 15.2098C11.7762 18.172 15.67 20.4631 15.67 20.4631C16.9803 20.9408 18.0758 21.3837 18.9935 20.4631Z"
            stroke="#07768D"
            stroke-linejoin="round"
          />
        </svg>
      );

    case 'burgerMenu':
      return (
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 0V1H0V0H20ZM0 7.5H20V6.5H0V7.5ZM20 14H0V13H20V14Z"
            fill="white"
          />
        </svg>
      );

    case 'search':
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 15.3L21.9 21.1L21.1 21.9L15.3 16C13.8225 17.2676 11.9465 17.9755 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C17.9755 11.9465 17.2676 13.8225 16 15.3ZM3 10C3 13.866 6.13401 17 10 17C11.8565 17 13.637 16.2625 14.9497 14.9497C16.2625 13.637 17 11.8565 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10Z"
            fill="white"
          />
        </svg>
      );

    default:
      <></>;
  }
  return <></>;
}
