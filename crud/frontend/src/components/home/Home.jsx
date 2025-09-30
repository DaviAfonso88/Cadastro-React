import { Main } from "../template/Main";

const Home = () => (
  <Main icon="home" title="Início" subtitle="Projeto React">
    <div className="display-4 mb-3">👋 Bem-vindo!</div>
    <hr />

    <p className="lead">
      Este sistema foi desenvolvido para exemplificar a construção de um
      cadastro em <strong>React</strong>, com funcionalidades completas de CRUD
      (Criar, Ler, Atualizar e Deletar).
    </p>

    <div className="row mt-4">
      <div className="col-md-4 mb-3">
        <div className="card shadow-sm h-100 text-center p-3">
          <h5 className="mb-2">🚀 Tecnologias</h5>
          <p className="text-muted">
            React, Axios, Bootstrap e uma API REST simulada para persistência de
            dados.
          </p>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow-sm h-100 text-center p-3">
          <h5 className="mb-2">🧑‍💻 Funcionalidades</h5>
          <ul className="list-unstyled mb-0 text-muted">
            <li>Cadastro de usuários</li>
            <li>Edição de informações</li>
            <li>Listagem em tabela</li>
            <li>Exclusão com confirmação</li>
          </ul>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow-sm h-100 text-center p-3">
          <h5 className="mb-2">📌 Navegação</h5>
          <p className="text-muted">
            Utilize o menu lateral para acessar as páginas do sistema e explorar
            as funcionalidades disponíveis.
          </p>
        </div>
      </div>
    </div>

    <div className="alert alert-info mt-4" role="alert">
      💡 Dica: Comece pelo menu <strong>Usuários</strong> e cadastre novos
      registros!
    </div>
  </Main>
);

export { Home };
