import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText =
    isLoading == true
      ? "Carregando..."
      : new Date(data.updated_at).toLocaleString("pt-BR");
  return <div>Última atualização: {updatedAtText}</div>;
}
function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let versionDB =
    isLoading == true ? "Carregando..." : data.dependencies.database.version;
  let limitConnections =
    isLoading == true
      ? "Carregando..."
      : data.dependencies.database.max_connections;
  let activeConnections =
    isLoading == true
      ? "Carregando..."
      : data.dependencies.database.opened_connections;
  return (
    <div>
      <h3>Database Status</h3>
      <p>Versão: {versionDB}</p>
      <p>Limite de conexões: {limitConnections}</p>
      <p>Conexões ativas: {activeConnections}</p>
    </div>
  );
}
