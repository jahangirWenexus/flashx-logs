import { useEffect, useState } from "react";
import { Button, Collapsible, TextField } from "@shopify/polaris";
import SwitchWithLoading from "../common/switch-with-loading";
import { BASE_URL } from "../../config";

const AppControlCard = ({
  store,
  setReFetch = () => {},
}: {
 store: any;
  setReFetch: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);
  // ts-ignore
  const [storeFrontLogLoading, setStoreFrontLogLoading] = useState(false);
  const [productHideLoading, setProductHideLoading] = useState(false);

  const [hideSelector, setHideSelector] = useState("");

  const [open, setOpen] = useState(false);

  // const handleToggle = useCallback(() => setOpen((open) => !open), []);
console.log(store, storeFrontLogLoading)
  const handleWidgetEnable = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("storeId", store.id);
    // formData.append("enabledSwitch", packageProtection.enabled as any);
    formData.append("action", "widgetEnable");

    fetch(`${BASE_URL}/admin/api/subscriber`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          setReFetch((prev: boolean) => !prev);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => {
        console.error("Error updating store status:", err);
      });
  };
  const handleAutoProtection = () => {
    setAutoLoading(true);
    const formData = new FormData();
    formData.append("storeId", store.id);
    // formData.append(
    //   "insuranceDisplayButton",
    //   packageProtection.insuranceDisplayButton as any
    // );
    formData.append("action", "autoProtection");

    fetch(`${BASE_URL}/admin/api/subscriber`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          setReFetch((prev: boolean) => !prev);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => {
        console.error("Error updating store status:", err);
      });
  };

  // ts-ignore
  const handleStoreFrontLog = () => {
    setStoreFrontLogLoading(true);
    const formData = new FormData();
    formData.append("storeId", store.id);
    // formData.append("storeFrontLog", packageProtection.storeFrontLog as any);
    formData.append("action", "storeFrontLog");

    fetch(`${BASE_URL}/admin/api/subscriber`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          setReFetch((prev: boolean) => !prev);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => {
        console.error("Error updating store status:", err);
      });
  };

  const handleProductHide = () => {
    setProductHideLoading(true);
    handleStoreFrontLog()
    const formData = new FormData();
    formData.append("action", "productHide");
    formData.append("storeId", store.id);
    formData.append("hideSelector", hideSelector as any);
    // formData.append(
    //   "productHideSwitch",
    //   !packageProtection.productHideSwitch as any
    // );

    fetch(`${BASE_URL}/admin/api/subscriber`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          setReFetch((prev: boolean) => !prev);
          setOpen(false);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => {
        console.error("Error updating store status:", err);
      });
  };

  useEffect(() => {
    setLoading(false);
    setAutoLoading(false);
    setProductHideLoading(false);
    setStoreFrontLogLoading(false);
    // setHideSelector(packageProtection?.productHideSelector || "");
  }, [store]);

  return (
    <div
      className=" rounded-lg shadow-sm p-4 h-full"
      style={{ backgroundColor: "#b6d6ff" }}
    >
      <span className="text-lg font-bold">App Control</span>

      <div className="flex justify-between mt-2">
        <span className="text-lg">App status</span>
        {store && (
          <SwitchWithLoading
            switchOn={store?.development}
            handleSwitch={handleWidgetEnable}
            isLoading={loading}
          />
        )}
      </div>

      <div className="flex justify-between my-3">
        <span className="text-lg">Review request</span>
        {store && (
          <SwitchWithLoading
            switchOn={store.appReview}
            handleSwitch={handleAutoProtection}
            isLoading={autoLoading}
          />
        )}
      </div>

      {/*<div className="flex justify-between my-3">*/}
      {/*  <span className="text-lg">Store Front Log</span>*/}
      {/*  {packageProtection && (*/}
      {/*    <SwitchWithLoading*/}
      {/*      switchOn={packageProtection?.storeFrontLog}*/}
      {/*      handleSwitch={handleStoreFrontLog}*/}
      {/*      isLoading={storeFrontLogLoading}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}

      {/*<div className="flex justify-between my-3">*/}
      {/*  <span*/}
      {/*    className="text-lg cursor-pointer"*/}
      {/*    onClick={() => setOpen((p) => !p)}*/}
      {/*  >*/}
      {/*    Hide Product From Store{" "}*/}
      {/*  </span>*/}
      {/*  {packageProtection && (*/}
      {/*    <SwitchWithLoading*/}
      {/*      switchOn={packageProtection?.productHideSwitch}*/}
      {/*      handleSwitch={handleProductHide}*/}
      {/*      isLoading={productHideLoading}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}

      <div className="my-2">
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          <TextField
            label="Search Class Selector"
            placeholder=".grid-item"
            helpText={`Enter the CSS class to hide the shipping protection product on your store (e.g., .grid-item).`}
            autoComplete="off"
            maxLength={70}
            showCharacterCount
            value={hideSelector}
            onChange={(value) => setHideSelector(value)}
          />
          <div className="flex justify-end ">
            <Button
              size="slim"
              variant="primary"
              onClick={handleProductHide}
              disabled={!hideSelector}
              loading={productHideLoading}
            >
              Save
            </Button>
          </div>
        </Collapsible>
      </div>
      {/* <Button tone="success" variant="primary" size="large" fullWidth>
        Add Custom JavaScript Code
      </Button> */}
    </div>
  );
};

export default AppControlCard;
