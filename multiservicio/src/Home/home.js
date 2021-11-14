import './home.css';

const signUpButton = () => {
    let container = document.getElementById('container');
    container.classList.add("right-panel-active");
}

const signInButton = () => {
    let container = document.getElementById('container');
    container.classList.remove("right-panel-active");
}

function Home() {

    return (
        <div>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Crear una cuenta</h1>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bienvenido de nuevo!</h1>
                            <p>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                            <button className="ghost" id="signIn" onClick={signInButton}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Ingrese sus datos personales y comience su viaje con nosotros</p>
                            <button className="ghost" id="signUp" onClick={signUpButton}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
