import type { NextPage } from "next";
import { useEffect, useState } from "react";

interface MessageNotificationAdmin {
  orderId: number;
  firstName: string;
  lastName: string;
  withdraw: {
    price: number;
    unitPrice: string;
  };
}

const initialMessageNotificationAdmin: MessageNotificationAdmin = {
  orderId: 0,
  firstName: "",
  lastName: "",
  withdraw: {
    price: 0,
    unitPrice: "THB",
  },
};

const Home: NextPage = () => {
  const baseUrl = "http://localhost:4002";

  const [dataOfNotificationAdmin, setDataOfNotificationAdmin] = useState<
    MessageNotificationAdmin[]
  >([]);

  useEffect(() => {
    notificationAdmin();
  });

  const notificationAdmin = async () => {
    const eventSource = new EventSource(`${baseUrl}/notification/admin`);
    eventSource.onmessage = (e) =>
      setDataOfNotificationAdmin([JSON.parse(e.data)]);
    return () => {
      eventSource.close();
    };
  };

  return (
    <div className="p-10">
      <div className="font-bold text-blue-500 text-xl">Notification admin</div>{" "}
      <div className="my-4 text-green-600 font-bold">History</div>
      <div className="space-y-2">
        {dataOfNotificationAdmin.length === 0 ? (
          <div className="w-96 p-10 border text-center">No data</div>
        ) : (
          <>
            {" "}
            {dataOfNotificationAdmin?.map((item, index) => {
              return (
                <div
                  key={item.orderId + index}
                  className="border w-96 rounded-md p-4 text-sm text-gray-500 font-semibold"
                >
                  <div>
                    Order ID :{" "}
                    <span className="font-bold text-red-600 text-xl">
                      {item.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div>Full name : </div>
                    <div className="font-semibold text-black">
                      {item.firstName} {item.lastName}
                    </div>
                  </div>
                  <div>
                    <div>Withdraw</div>
                    <div className="flex justify-between pl-6">
                      <div>Price : </div>
                      <div className="font-semibold text-black">
                        {item?.withdraw?.price} {item?.withdraw?.unitPrice}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
