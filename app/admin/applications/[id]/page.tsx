"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { format } from "date-fns";

interface Application {
  id: string;
  displayId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  outsideUS: boolean;
  textAlerts: boolean;
  referralSource?: string;
  breedChoices: Array<{ priority: number; breed: string }>;
  preferredSizes: string[];
  preferredGender: string;
  preferredColors: string[];
  preferredCoatTypes: string[];
  activityLevel: string;
  pickupLocation: string;
  secondPickupLocation?: string;
  deliveryMethod: string;
  paymentMethod?: string;
  depositAmount?: number;
  otherPets: boolean;
  petTypes?: string;
  allergies?: string;
  hasChildren: boolean;
  childrenAges?: string;
  hasFence: boolean;
  alternativeExercise?: string;
  lifestyle: string;
  typicalDay: string;
  whyGoodFit: string;
  firstDog: boolean;
  previousPuppies: number;
  interestedInTraining: boolean;
  spayNeuterAgreement: boolean;
  optInCommunications: boolean;
  welcomeCall: boolean;
  status: string;
  rejectionReason?: string;
  puppyId?: string;
  createdAt: string;
  updatedAt: string;
  puppy?: {
    id: string;
    name: string;
    breed: string;
    gender: string;
    color: string;
    price: number;
    birthDate: string;
    images: string[];
  };
}

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchApplication();
  }, [params.id, token, router]);

  async function fetchApplication() {
    try {
      setLoading(true);
      const response = await fetch(`${getApiUrl()}/api/applications/${params.id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch application");
      }

      const data = await response.json();
      setApplication(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch application");
    } finally {
      setLoading(false);
    }
  }

  async function updateApplicationStatus(status: "approved" | "rejected", rejectionReason?: string) {
    try {
      setUpdating(true);
      const response = await fetch(`${getApiUrl()}/api/applications/${params.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, rejectionReason }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchApplication(); // Refresh the data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error || "Application not found"}</p>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Application #{application.displayId}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : application.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Information */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Applicant Information</h2>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                    <p className="text-gray-900">
                      {application.firstName} {application.lastName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    <p className="text-gray-900">{application.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                    <p className="text-gray-900">{application.mobileNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                    <p className="text-gray-900">
                      {application.address}, {application.city}, {application.state} {application.zipCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Referral Source</h3>
                    <p className="text-gray-900">{application.referralSource || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Applied Date</h3>
                    <p className="text-gray-900">
                      {format(new Date(application.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Puppy Preferences */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Puppy Preferences</h2>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Breed Choices</h3>
                    <ul className="text-gray-900 space-y-1">
                      {application.breedChoices.map((choice, index) => (
                        <li key={index}>
                          {index + 1}. {choice.breed} (Priority {choice.priority})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Gender</h3>
                    <p className="text-gray-900 capitalize">{application.preferredGender}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Sizes</h3>
                    <p className="text-gray-900">{application.preferredSizes.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Activity Level</h3>
                    <p className="text-gray-900 capitalize">{application.activityLevel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Pickup Location</h3>
                    <p className="text-gray-900">{application.pickupLocation}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Delivery Method</h3>
                    <p className="text-gray-900 capitalize">{application.deliveryMethod}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
                    <p className="text-gray-900 capitalize">{application.paymentMethod || "Not specified"}</p>
                  </div>
                  {application.depositAmount && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Deposit Amount</h3>
                      <p className="text-gray-900">${application.depositAmount}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Household Information */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Household Information</h2>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Lifestyle</h3>
                    <p className="text-gray-900">{application.lifestyle}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Typical Day</h3>
                    <p className="text-gray-900">{application.typicalDay}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Why You're a Good Fit</h3>
                    <p className="text-gray-900">{application.whyGoodFit}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Other Pets</h3>
                      <p className="text-gray-900">{application.otherPets ? "Yes" : "No"}</p>
                    </div>
                    {application.otherPets && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Pet Types</h3>
                        <p className="text-gray-900">{application.petTypes || "Not specified"}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Allergies</h3>
                      <p className="text-gray-900">{application.allergies || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Has Children</h3>
                      <p className="text-gray-900">{application.hasChildren ? "Yes" : "No"}</p>
                    </div>
                    {application.hasChildren && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Children Ages</h3>
                        <p className="text-gray-900">{application.childrenAges || "Not specified"}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Has Fence</h3>
                      <p className="text-gray-900">{application.hasFence ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">First Dog</h3>
                      <p className="text-gray-900">{application.firstDog ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Previous Puppies</h3>
                      <p className="text-gray-900">{application.previousPuppies}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Interested in Training</h3>
                      <p className="text-gray-900">{application.interestedInTraining ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Opt-in Communications</h3>
                      <p className="text-gray-900">{application.optInCommunications ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Welcome Call</h3>
                      <p className="text-gray-900">{application.welcomeCall ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Puppy Information */}
            {application.puppy && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Puppy Information</h2>
                </div>
                <div className="px-6 py-4">
                  {application.puppy.images && application.puppy.images.length > 0 && (
                    <img
                      src={application.puppy.images[0]}
                      alt={application.puppy.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <span className="ml-2 text-gray-900">{application.puppy.name}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Breed:</span>
                      <span className="ml-2 text-gray-900">{application.puppy.breed}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Gender:</span>
                      <span className="ml-2 text-gray-900 capitalize">{application.puppy.gender}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Color:</span>
                      <span className="ml-2 text-gray-900">{application.puppy.color}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Price:</span>
                      <span className="ml-2 text-gray-900">${application.puppy.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Actions</h2>
              </div>
              <div className="px-6 py-4 space-y-3">
                {application.status === "submitted" && (
                  <>
                    <button
                      onClick={() => updateApplicationStatus("approved")}
                      disabled={updating}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      {updating ? "Updating..." : "Approve Application"}
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt("Please provide rejection reason:");
                        if (reason) {
                          updateApplicationStatus("rejected", reason);
                        }
                      }}
                      disabled={updating}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {updating ? "Updating..." : "Reject Application"}
                    </button>
                  </>
                )}
                
                {application.status === "approved" && (
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-green-800 text-sm font-medium">Approved</p>
                    <p className="text-green-600 text-sm mt-1">
                      This application has been approved. The applicant will be notified.
                    </p>
                  </div>
                )}
                
                {application.status === "rejected" && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-red-800 text-sm font-medium">Rejected</p>
                    <p className="text-red-600 text-sm mt-1">
                      {application.rejectionReason || "No reason provided"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
