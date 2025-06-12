

// export function MyComponent(){
//   // export default function MyComponent(){ --> now you doesn't need braces {} in app.jsx while importing
//   return(
//     <>
//     hello
//     </>
//   )

// }

// Day -2 Code -------------------------------

import { useNavigate } from "react-router-dom"
export default function MyComponent() {
    const navigate = useNavigate();
    return (
        <>
            Hello
            <button onClick={() => { navigate('/dashboard') }}>Navigate</button>
        </>
    )
}