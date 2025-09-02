import React, { useState } from "react";
import AppLayout from "../../components/AppLayout";
import AddCollection from "./AddCollection";
import ShowCollections from "./ShowCollections";

const Collections = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCollectionAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <AppLayout>
      <div className="container-fluid" style={{ width: "100%", maxWidth: "1200px" }}>
        <AddCollection onCollectionAdded={handleCollectionAdded} />
        <ShowCollections refreshKey={refreshKey} />
      </div>
    </AppLayout>
  );
};

export default Collections;
