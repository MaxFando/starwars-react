import React, { useState } from "react";
import { PlanetDetails, PlanetList } from "../sw-components";
import Row from "../row";

const PlanetPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemSelected = selectedItem => {
    setSelectedItem(selectedItem);
  };

  return (
    <div>
      <h2>Planets</h2>
      <Row
        left={<PlanetList onItemSelected={onItemSelected} />}
        right={<PlanetDetails itemId={selectedItem} />}
      />
    </div>
  );
};

export default PlanetPage;
