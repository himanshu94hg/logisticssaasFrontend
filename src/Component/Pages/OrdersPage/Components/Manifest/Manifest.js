import moment from 'moment';
import NoData from '../../../../common/noData';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import globalDebouncedClick from '../../../../../debounce';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'


const Manifest = ({ manifestOrders, activeTab, partnerList, setLoader }) => {
    const dispatch = useDispatch();
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [generateinvoice, setGenerateinvoice] = useState(false);
    const { downloadManifest } = useSelector(state => state?.orderSectionReducer)
    const { labelData, invoiceData, orderdelete } = useSelector(state => state?.orderSectionReducer)


    useEffect(() => {
        if (labelData) {
            if (genaratelabel === true) {
                const blob = new Blob([labelData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'label.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setGenaratelabel(false)
            }
        }
    }, [labelData])

    useEffect(() => {
        if (invoiceData) {
            if (generateinvoice === true) {
                const blob = new Blob([invoiceData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Invoice.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setGenerateinvoice(false)
            }
        }
    }, [invoiceData])

    useEffect(() => {
        if (downloadManifest) {
            if (activeTab === "Manifest") {
                const blob = new Blob([downloadManifest], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'manifest.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setLoader(false)
            }
        }
    }, [downloadManifest])


    const handleClick = (data) => {
        if (activeTab === "Manifest") {
            dispatch({
                type: "BULK_ORDER_DOWNLOAD_MANIFEST_ACTION", payload: {
                    manifest_id: data
                }
            })
        }
    };

    const handleClickDownloadLabel = async (data) => {
        let temp = []
        data.map((item) => {
            temp.push(item?.order)
        })
        dispatch({
            type: "BULK_ORDER_GENERATE_LABEL_ACTION",
            payload: {
                order_ids: `${temp.join(",")}`
            }
        });
        setGenaratelabel(true)
    }

    const handleClickDownloadInvoice = async (data) => {
        let temp = []
        data.map((item) => {
            temp.push(item?.order)
        })
        dispatch({
            type: "BULK_ORDER_GENERATE_INVOICE_ACTION", payload: {
                order_ids: `${temp.join(",")}`
            }
        });
        setGenerateinvoice(true)
    }

    const manifestDownload = (data) => {
        setLoader(true)
        globalDebouncedClick(() => handleClick(data));
    }

    const handleDownloadLabel = async (data) => {
        setLoader(true)
        globalDebouncedClick(() => handleClickDownloadLabel(data));
    };

    const handleDownloadInvoice = async (data) => {
        setLoader(true)
        globalDebouncedClick(() => handleClickDownloadInvoice(data));
    };

    const [dropdownPosition, setDropdownPosition] = useState({});
    const [activeIndex, setActiveIndex] = useState(null);
    const rowRefs = useRef([]);

    rowRefs.current = [];

    const updateDropdownPosition = () => {
        const viewportHeight = window.innerHeight;
        const updatedPositions = {};

        rowRefs.current.forEach((row, index) => {
            if (row) {
                const { top, height } = row.getBoundingClientRect();
                const rowTopRelativeToViewport = top; // Distance from the top of the viewport
                const rowBottomRelativeToViewport = rowTopRelativeToViewport + height;

                const viewportRowsCount = Math.floor(viewportHeight / height); // How many rows fit in the viewport

                let position = 'middle'; // Default to middle

                if (rowTopRelativeToViewport < viewportHeight * 0.25) {
                    // Top 25% of the viewport (top rows)
                    position = 'below';
                } else if (rowBottomRelativeToViewport > viewportHeight * 0.75) {
                    // Bottom 25% of the viewport (bottom rows)
                    position = 'above';
                }

                updatedPositions[index] = position;
            }
        });

        setDropdownPosition(updatedPositions);
    };

    useEffect(() => {
        updateDropdownPosition(); // Initial positioning
        window.addEventListener('scroll', updateDropdownPosition); // Add scroll event listener
        window.addEventListener('resize', updateDropdownPosition); // Update on window resize
        return () => {
            window.removeEventListener('scroll', updateDropdownPosition); // Cleanup
            window.removeEventListener('resize', updateDropdownPosition); // Cleanup
        };
    }, []);



    const handleMouseEnter = (index) => {
        setActiveIndex(index);
        updateDropdownPosition(); // Ensure position is updated on mouse enter
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
        setDropdownPosition({})
    };


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container m-table-height'>
                    <table className=" w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '10%' }}>Manifest Id</th>
                                <th style={{ width: '12.5%' }}>Created</th>
                                <th style={{ width: '12%' }}>Created By</th>
                                <th style={{ width: '14%' }}>Courier</th>
                                <th style={{ width: '16%' }}>Number of Order(s)</th>
                                <th style={{ width: '20%' }}>Pickup Reference Number</th>
                                <th style={{ width: '15%' }}>Download</th>

                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {manifestOrders?.map((row, index) => (
                                <React.Fragment key={row?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{row?.id}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{moment(row?.created).format("YYYY-MM-DD")}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row?.type}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.courier && <img src={partnerList[row?.courier]["image"]} title='Partner' />}
                                                <div>
                                                    <p className='mt-1 cursor-pointer text-capitalize' >
                                                        {row?.courier && partnerList[row?.courier]["title"]}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <td className='align-middle'>
                                                <div className='cell-inside-box'>
                                                    <p>{row?.number_of_order}</p>
                                                </div>
                                            </td>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>{row?.p_ref_no} </p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button' onClick={() => manifestDownload(row?.id)}> Download Manifest</button>
                                                <div
                                                    ref={(el) => (rowRefs.current[index] = el)}
                                                    onMouseEnter={() => handleMouseEnter(index)}
                                                    onMouseLeave={handleMouseLeave}
                                                    className="action-options"
                                                >
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    {
                                                        activeIndex === index && (
                                                            <div className={`action-list ${dropdownPosition[index] || ''}`}>
                                                                <ul>
                                                                    <li onClick={() => handleDownloadLabel(row?.manifest_order)}>Download Label</li>
                                                                    <li onClick={() => handleDownloadInvoice(row?.manifest_order)}>Download Invoice</li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {manifestOrders?.length === 0 && <NoData />}
                </div>
            </div>
        </section>
    );
};

export default Manifest;