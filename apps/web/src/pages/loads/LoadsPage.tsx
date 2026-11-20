import type { Load } from "../../types/load";
import { getAllLoads } from "../../services/loads.service";
import { Table } from "../../components/Table/Table";
import { loadColumns } from "./loadColumns";
import { useFetchList } from "../../hooks/useFetchList";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/ButtonElements";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/PageContainer/PageContainerElements";

export const LoadsPage = () => {
  const { data, isLoading, error } = useFetchList<Load>(getAllLoads);

  const navigate = useNavigate();

  const handleAddLoad = () => {
    navigate("/loads/new");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Loads"
        action={<Button onClick={handleAddLoad}>Add load</Button>}
      />
      <Table<Load> name="loads" columns={loadColumns} rows={data} />
    </PageContainer>
  );
};
