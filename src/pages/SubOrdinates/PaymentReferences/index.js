import { ToastContainer, toast, Zoom } from "react-toastify";
import { useEffect, useState } from "react";
import { getPaymentReferenceNumbersData } from "../../../api/api";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import "./style.scss";
import * as React from 'react';
import Table from '../../../ui-components/Table/SortableTable'

defineLordIconElement(loadAnimation);
import "../../Users/Profile/style.scss";
import Loading from "../../../ui-components/Loding/Loading";

const PaymentReferences = () => {
    const [loading, setLoading] = useState(true);
    const [referencesData, setReferencesData] = useState([]);

    useEffect(() => {
        getPaymentRefernceNumbers();
    }, []);

    const getPaymentRefernceNumbers = async () => {
        try {
            setLoading(true);
            const response = await getPaymentReferenceNumbersData();
            if (response && response.data) {
                setReferencesData(response.data);
                setLoading(false);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.error?.message || "Something wend wrong",
                {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "colored",
                    transition: Zoom,
                }
            );
            setLoading(false);
        }
    }

    return (
        <div className="container-fluid profile">
            <h2>
                <lord-icon
                    src="https://cdn.lordicon.com/lupuorrc.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#d53833"
                    style={{ width: 55, height: 100 }}
                ></lord-icon>
                Payment Reference Numbers
            </h2>
            <div >
                <Loading loading={loading} />

                <Table data={referencesData} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default PaymentReferences;
