import { useEffect, useState } from "react";
import { Main } from "../template/Main";
import "../template/Modal.css";
import api from "../service/api";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir",
};

const initialUser = { name: "", email: "" };

export default function UserCrud() {
  const [user, setUser] = useState(initialUser);
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    api.get("/users").then((resp) => setList(resp.data));
  }, []);

  function clear() {
    setUser(initialUser);
    setErrors({ name: "", email: "" });
  }

  function validate() {
    const newErrors = { name: "", email: "" };
    if (!user.name.trim()) newErrors.name = "O nome é obrigatório";
    if (!user.email.trim()) newErrors.email = "O e-mail é obrigatório";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  }

  async function save() {
    if (!validate()) return;

    try {
      if (user.id) {
        const { data } = await api.put(`/users/${user.id}`, user);
        setList((prev) => [data, ...prev.filter((u) => u.id !== user.id)]);
      } else {
        const { data } = await api.post("/users", user);
        setList((prev) => [data, ...prev]);
      }
      clear();
    } catch (err) {
      console.error("Erro ao salvar usuário:", err);
    }
  }

  function updateField(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function load(user) {
    setUser(user);
  }

  function confirmRemove(user) {
    setUserToDelete(user);
    setShowConfirm(true);
  }

  async function removeConfirmed() {
    try {
      await api.delete(`/users/${userToDelete.id}`);
      setList((prev) => prev.filter((u) => u.id !== userToDelete.id));
    } catch (err) {
      console.error("Erro ao remover usuário:", err);
    } finally {
      setShowConfirm(false);
      setUserToDelete(null);
    }
  }

  function renderForm() {
    return (
      <div
        className="card p-4 mb-4 shadow-sm"
        style={{ borderRadius: "12px", background: "#fff" }}
      >
        <h5
          className="mb-4"
          style={{
            fontWeight: "600",
            background: "linear-gradient(90deg, #07a7e3, #32dac3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Cadastro de Usuário
        </h5>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Nome</label>
            <input
              type="text"
              className={`form-control form-control-lg ${
                errors.name ? "is-invalid" : ""
              }`}
              name="name"
              value={user.name}
              onChange={updateField}
              placeholder="Digite o nome..."
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                transition: "0.3s",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">E-mail</label>
            <input
              type="email"
              className={`form-control form-control-lg ${
                errors.email ? "is-invalid" : ""
              }`}
              name="email"
              value={user.email}
              onChange={updateField}
              placeholder="Digite o e-mail..."
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                transition: "0.3s",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-end gap-2">
          <button
            className="btn btn-primary btn-lg"
            onClick={save}
            style={{
              background: "linear-gradient(135deg, #07a7e3, #32dac3)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              transition: "0.3s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            Salvar
          </button>

          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={clear}
            style={{
              borderRadius: "8px",
              color: "#555",
              borderColor: "#ccc",
              transition: "0.3s",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  function renderTable() {
    return (
      <div className="table-responsive">
        <table className="table shadow rounded overflow-hidden">
          <thead style={{ backgroundColor: "#3c8a7f", color: "#fff" }}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr
                key={u.id}
                style={{
                  transition: "0.3s",
                  cursor: "default",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f9f8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-sm"
                    onClick={() => load(u)}
                    title="Editar"
                    style={{
                      background: "linear-gradient(135deg, #07a7e3, #32dac3)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      transition: "0.3s",
                    }}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>

                  <button
                    className="btn btn-sm"
                    onClick={() => confirmRemove(u)}
                    title="Excluir"
                    style={{
                      background: "linear-gradient(135deg, #ff5e5e, #ff8f8f)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      transition: "0.3s",
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function ConfirmModal() {
    if (!showConfirm) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <h5>Confirmação</h5>
          <p>Deseja realmente excluir o usuário "{userToDelete.name}"?</p>
          <div className="modal-actions">
            <button className="btn btn-danger" onClick={removeConfirmed}>
              Excluir
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfirm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Main {...headerProps}>
      {renderForm()}
      {renderTable()}
      <ConfirmModal />
    </Main>
  );
}
