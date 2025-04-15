import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import {FiBarChart2, FiInbox, FiEdit } from 'react-icons/fi';

const page = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId;
    const token = await getServerSession(authOptions);

    const formRes = await fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`, {
            headers: {
                Authorization: `Bearer ${token?.accessToken}`
            }
        }
    );

    const data = await formRes.json();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        {data.data.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Manage your form settings and analytics
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        href={`/forms/${formId}/builder`}
                        className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-500"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4 text-blue-500 group-hover:text-blue-700 transition-colors">
                                <FiEdit className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Form Builder</h3>
                            <p className="text-gray-600 text-center text-sm">
                                Customize your form fields and design
                            </p>
                        </div>
                    </Link>

                    <Link
                        href={`/forms/${formId}/submission`}
                        className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-green-500"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4 text-green-500 group-hover:text-green-700 transition-colors">
                                <FiInbox className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Submissions</h3>
                            <p className="text-gray-600 text-center text-sm">
                                View and manage form responses
                            </p>
                        </div>
                    </Link>

                    <Link
                        href={`/forms/${formId}/analytics`}
                        className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-purple-500"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-4 text-purple-500 group-hover:text-purple-700 transition-colors">
                                <FiBarChart2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                            <p className="text-gray-600 text-center text-sm">
                                Analyze response trends and stats
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;