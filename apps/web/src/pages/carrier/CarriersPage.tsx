import type { Carrier } from "../../types/carrier";
import { getAllCarriers } from "../../services/carrier.service";
import { Table } from "../../components/Table/Table";
import { carrierColumns } from "./carrierColumns";
import { useFetchList } from "../../hooks/useFetchList";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { PageContainer } from "../../components/PageContainer/PageContainerElements";
import { Button } from "../../components/Button/ButtonElements";
import { useNavigate } from "react-router-dom";

export const CarriersPage = () => {
  const { data, isLoading, error } = useFetchList<Carrier>(getAllCarriers);

  const navigate = useNavigate();

  const handleAddCarrier = () => {
    navigate("/carrier/new");
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
        title="Carriers"
        action={<Button onClick={handleAddCarrier}>Add carrier</Button>}
      />
      <Table<Carrier> name="carrier" columns={carrierColumns} rows={data} />
    </PageContainer>
  );
};
