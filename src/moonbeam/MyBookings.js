import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ContextWeb3 from "./ContextWeb3";
import { FormattedMessage } from "react-intl";
import { getAllBookings } from "../components/helpers/bonvoProperties";

export const MyBookings = ({ user }) => {
    const { state } = useContext(ContextWeb3);

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (state.address?.length > 0) {
                const allBookings = await getAllBookings(state.address);
                debugger;
                setBookings(allBookings);
            }
        };
        if (!false) {
            fetchBookings();
        }
    }, [state.address]);

    return (
        <div className="ltn__myaccount-tab-content-inner">
            <div className="ltn__my-properties-table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <FormattedMessage id="myaccount-history-property" />
                            </th>
                            <th scope="col" />
                            <th scope="col">
                                <FormattedMessage id="myaccount-history-date" />
                            </th>
                            <th scope="col">
                                <FormattedMessage id="myaccount-history-actions" />
                            </th>
                            <th scope="col">
                                <FormattedMessage id="myaccount-history-delete" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length >
                            0 &&
                            bookings.map(
                                (
                                    booking,
                                    idx
                                ) => {
                                    //map this to the array that is retrieved from the API
                                    return (
                                        <tr
                                            key={
                                                idx
                                            }
                                        >
                                            <td className="ltn__my-properties-img go-top">
                                                {/* HOUSES */}
                                            </td>
                                            <td>
                                                <div className="ltn__my-properties-info">
                                                    <h6 className="mb-10 go-top">
                                                        <Link
                                                            to={`/product-details/${booking.bookingId}`}
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
                                                {
                                                    booking.timestamp
                                                }
                                            </td>
                                            <td>
                                                <button
                                                    className="btn reverse-color theme-btn-3 custom-review-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#quick_view_modal"
                                                    onClick={() => { }}
                                                >
                                                    <Link to="#">
                                                        Dejar
                                                        Reseña
                                                    </Link>
                                                </button>
                                            </td>
                                            <td className="centered-tc-cell">
                                                <Link to="#">
                                                    <i className="fa-solid fa-trash-can" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
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
        </div>
    );
};
