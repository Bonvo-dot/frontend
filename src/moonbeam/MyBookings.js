import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ContextWeb3 from "./ContextWeb3";
import { FormattedMessage } from "react-intl";
import { confirmRentalAsLandlord, confirmRentalAsTenant, getAllBookingsWithDetails, giveBadgeToLandlord, giveBadgeToProperty, giveBadgeToTenant } from "../components/helpers/bonvoProperties";
import { toast, ToastContainer } from "react-toastify";
import { getSigner } from "../components/helpers/common";

export const MyBookings = () => {
    const { state } = useContext(ContextWeb3);

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (state.address?.length > 0) {
                const allBookings = await getAllBookingsWithDetails(state.address);
                setBookings(allBookings);
            }
        };
        if (!false) {
            fetchBookings();
        }
    }, [state.address]);

    function formatDates(dates) {
        return <div>
            <div style={{ textAlign: 'center' }}>
                {
                    new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(dates[0] * 1000)
                }
            </div>
            <div style={{ textAlign: 'center' }}>
                -
            </div>
            <div style={{ textAlign: 'center' }}>
                {
                    new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(dates[dates.length - 1] * 1000)
                }
            </div>
        </div>
    }

    function renderButtons(booking) {
        const timestampNow = Date.now();
        if (booking.dates[booking.dates.length - 1] * 1000 < timestampNow) {
            if (!booking.isFinished) {
                return <button
                    className="btn reverse-color theme-btn-3 custom-review-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#quick_view_modal"
                    onClick={() => { }}
                    style={{ width: '180px' }}
                >
                    <Link to="#" onClick={() => confirmBooking(booking)}>Confirm rental</Link>
                </button>
            } else {
                return <>
                    <button
                        className="btn reverse-color theme-btn-3 custom-review-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#quick_view_modal"
                        onClick={() => { }}
                        style={{ width: '180px', marginRight: '0px' }}
                    >
                        <Link to="#" onClick={() => giveMedal(booking)}>Medal to {booking.type === 'tenant' ? 'landlord' : 'tenant'}</Link>
                    </button>
                    {
                        booking.type === 'tenant' &&
                        <button
                            className="btn reverse-color theme-btn-3 custom-review-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#quick_view_modal"
                            onClick={() => { }}
                            style={{ width: '180px' }}
                        >
                            <Link to="#" onClick={() => giveMedalToProperty(booking)}>Medal to property</Link>
                        </button>
                    }
                </>
            }
        }
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function giveMedal(booking) {
        const signer = getSigner(state.address);

        const rndInt = randomIntFromInterval(1, 5)
        if (booking.type === 'tenant') {
            await giveBadgeToLandlord(signer, booking.bookingId, rndInt);
        } else {
            await giveBadgeToTenant(signer, booking.bookingId, rndInt);
        }
    }

    async function giveMedalToProperty(booking) {
        const signer = getSigner(state.address);
        const rndInt = randomIntFromInterval(1, 5)
        await giveBadgeToProperty(signer, booking.bookingId, rndInt);
    }

    async function confirmBooking(booking) {
        if (booking.type === 'tenant') {
            await confirmTenant(booking.bookingId);
        } else {
            await confirmLandlord(booking.bookingId);
        }
    }


    async function confirmLandlord(bookingId) {
        const id = showToastProgress();
        const signer = getSigner(state.address);
        const landlordReceipt = await confirmRentalAsLandlord(
            signer,
            bookingId
        );

        if (landlordReceipt && landlordReceipt.status === 1) {
            updateToastSuccess(id);
        }
    };

    async function confirmTenant(bookingId) {
        const id = showToastProgress();
        const signer = getSigner(state.address);
        const tenantReceipt = await confirmRentalAsTenant(
            signer,
            bookingId
        );

        if (tenantReceipt && tenantReceipt.status === 1) {
            updateToastSuccess(id);
        }
    };

    const showToastProgress = () => {
        const id = toast.loading(
            "Transacción en progreso. Por favor, espere la confirmación...",
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        return id;
    };

    const updateToastSuccess = (id) => {
        toast.update(id, {
            render: `
        Transacción realizada correctamente! 🎉
        `,
            type: "success",
            isLoading: false,
            autoClose: 5000,
        });
    };

    return (
        <div className="ltn__myaccount-tab-content-inner">
            <div className="ltn__my-properties-table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <FormattedMessage id="myaccount-history-property" />
                            </th>
                            <th scope="col" style={{ minWidth: '200px' }} />
                            <th scope="col">
                                Dates Booked
                            </th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                <FormattedMessage id="myaccount-history-actions" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length > 0 &&
                            bookings.map((booking, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td className="ltn__my-properties-img go-top" style={{ position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: '5px', left: '5px', fontSize: '12px' }}>
                                                {booking.type === 'tenant' ? 'Tenant' : 'Landlord'}
                                            </div>
                                            <Link to={`/product-details/${booking.propertyId}`}>
                                                <img
                                                    src={booking.images[0]}
                                                    alt="#"
                                                    style={{ borderRadius: '15px' }}
                                                />
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="ltn__my-properties-info">
                                                <h6 className="mb-10 go-top">
                                                    <Link
                                                        to={`/product-details/${booking.propertyId}`}
                                                    >
                                                        {booking.staticData &&
                                                            booking
                                                                .staticData
                                                                .title}
                                                    </Link>
                                                </h6>
                                                {booking.ISOCountry && (
                                                    <small>
                                                        <i className="icon-placeholder" />{" "}
                                                        {
                                                            booking.ISOCountry
                                                        }
                                                    </small>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            {formatDates(booking.dates)}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {renderButtons(booking)}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="ltn__pagination-area text-center">
                <div className="ltn__pagination">
                    <ul>
                        <li>
                            <Link to="#">
                                <i className="fas fa-angle-double-left" />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                1
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="#">
                                2
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                3
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                ...
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                10
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="fas fa-angle-double-right" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};
