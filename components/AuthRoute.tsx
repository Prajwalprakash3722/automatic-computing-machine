// import { Router } from "next/router";
// import { useEffect } from "react";

// interface Props {
//   router: Router;
//   children: any;
// }

// const AuthRoute = ({ router, children }: Props) => {
//   const isBrowser = () => typeof window !== "undefined";

//   const listItems = ["/"];

//   useEffect(() => {
//     if (
//       localStorage.getItem("token") &&
//       localStorage.getItem("isAuthenticated") === "true"
//     ) {
//       let pathIsProtected = listItems.indexOf(router.pathname) === -1;

//       if (isBrowser() && pathIsProtected) {
//         router.push("/login");
//       }
//     }
//   }, [listItems, router]);

//   return children;
// };
// export default AuthRoute;
