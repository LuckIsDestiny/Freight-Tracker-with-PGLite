import type { Shipper } from "../../types/shipper";
import { getAllShippers } from "../../services/shipper.service";
import { Table } from "../../components/Table/Table";
import { shipperColumns } from "./shipperColumns";
import { useFetchList } from "../../hooks/useFetchList";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { PageContainer } from "../../components/PageContainer/PageContainerElements";
import { Button } from "../../components/Button/ButtonElements";
import { useNavigate } from "react-router-dom";

export const ShippersPage = () => {
  const { data, isLoading, error } = useFetchList<Shipper>(getAllShippers);

  const navigate = useNavigate();

  const handleAddShipper = () => {
    navigate("/shipper/new");
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
        title="Shippers"
        action={<Button onClick={handleAddShipper}>Add shipper</Button>}
      />
      <Table<Shipper> name="shipper" columns={shipperColumns} rows={data} />
    </PageContainer>
  );
};
