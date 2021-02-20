import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

const Banner = () => {
    const { jetstream } = usePage().props;
    const [show, setShow] = useState(true);

    const getStyle = () => {
        const style = jetstream.flash?.bannerStyle || 'success';

        if (style === 'success') return 'bg-indigo-500';
        else if (style === 'danger') return 'bg-red-700';
        return '';
    };

    const getStyle2 = () => {
        const style = jetstream.flash?.bannerStyle || 'success';
        let result = 'flex p-2 rounded-lg ';

        if (style === 'success') result += 'rounded-lg bg-indigo-600';
        else if (style === 'danger') result += 'rounded-lg bg-red-600';

        return result;
    };

    const getStyle3 = () => {
        const style = jetstream.flash?.bannerStyle || 'success';
        let result =
            '-mr-1 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition ease-in-out duration-150 ';

        if (style === 'success') result += 'hover:bg-indigo-600 focus:bg-indigo-600';
        else if (style === 'danger') result += 'hover:bg-red-600 focus:bg-red-600';

        return result;
    };

    const isVisible = () => {
        return (show && jetstream.flash?.banner) || false;
    };

    return (
        <div>
            {isVisible() && (
                <div className={`${getStyle()}`}>
                    <div className="max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-0 flex-1 flex items-center min-w-0">
                                <span className={getStyle2()}>
                                    {(jetstream.flash?.bannerStyle === 'success' ||
                                        !jetstream.flash ||
                                        !jetstream.flash?.bannerStyle) && (
                                        <svg
                                            className="h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    )}

                                    {jetstream.flash?.bannerStyle === 'danger' && (
                                        <svg
                                            className="h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    )}
                                </span>

                                <p className="ml-3 font-medium text-sm text-white truncate">
                                    {jetstream.flash?.banner || ''}
                                </p>
                            </div>

                            <div className="flex-shrink-0 sm:ml-3">
                                <button
                                    type="button"
                                    className={getStyle3()}
                                    aria-label="Dismiss"
                                    onClick={() => setShow(false)}
                                >
                                    <svg
                                        className="h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;
