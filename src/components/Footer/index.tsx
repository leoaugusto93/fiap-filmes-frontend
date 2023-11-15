import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer>
            <Container>
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="/">Home</a></li>
                            <li className="mb-2"><a href="/filmes">Filmes</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-uppercase">Inscreva-se</h5>
                        <p>Inscreva-se e receba semanalmente nossas novidades.</p>
                        <div className="field-group">
                            <input type="search" className="field-group-search" placeholder="Digite seu e-mail..." autoComplete="off" />
                            <Button variant="primary">Inscrever</Button>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="footer-copyright">
                <Container>
                    <span>© 2023 FIAP - ATIVIDADE FULLSTACK <a href="/"> resenhafilmes.com.br</a></span>
                </Container>
            </div>
        </footer>
    );
}
export default Footer;