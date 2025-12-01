"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Container from "../../../components/organisms/Container";
import { useAdminAuth } from "../../../context/AdminAuthContext";

type ApplicationStatus = "submitted" | "approved" | "rejected";

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
  referralSource?: string | null;
  breedChoices: any;
  preferredSizes: string[];
  preferredGender: string;
  preferredColors: string[];
  preferredCoatTypes: string[];
  activityLevel: string;
  pickupLocation: string;
  secondPickupLocation?: string | null;
  deliveryMethod: string;
  paymentMethod?: string | null;
  depositAmount?: number | null;
  otherPets: boolean;
  petTypes?: string | null;
  allergies?: string | null;
  hasChildren: boolean;
  childrenAges?: string | null;
  hasFence: boolean;
  alternativeExercise?: string | null;
  lifestyle: string;
  typicalDay: string;
  whyGoodFit: string;
  firstDog: boolean;
  previousPuppies: number;
  interestedInTraining: boolean;
  spayNeuterAgreement: boolean;
  optInCommunications: boolean;
  welcomeCall: boolean;
  status: ApplicationStatus;
  rejectionReason?: string | null;
  puppyId?: string | null;
  createdAt: string;
  updatedAt: string;
  puppy?: {
    id: string;
    name: string;
    breed: string;
  } | null;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

export default function AdminApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const router = useRouter();
  const { token } = useAdminAuth();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      // If not logged in as admin, send to login
      router.push("/admin/login");
      return;
    }
  }, [token, router]);

  useEffect(() => {
    if (!applicationId) return;

    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/applications/${applicationId}`);

        if (res.status === 404) {
          // Application not found
          notFound();
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch application");
        }

        const data = await res.json();
        setApplication(data);
      } catch (err: any) {
        console.error("Failed to fetch application:", err);
        setError(err.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (!token) {
    // Brief placeholder while redirecting
    return (
      <div className="py-10">
        <Container>
          <p className="text-center text-gray-600">Redirecting to admin login…</p>
        </Container>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-10">
        <Container>
          <p className="text-center text-gray-600">Loading application…</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <Container>
          <div className="max-w-xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-xl font-semibold text-red-700 mb-2">
              Failed to load application
            </h1>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
            >
              Go Back
            </button>
          </div>
        </Container>
      </div>
    );
  }

  if (!application) {
    notFound();
  }

  const fullName = `${application!.firstName} ${application!.lastName}`;
  const fullAddress = `${application!.address}, ${application!.city}, ${application!.state} ${application!.zipCode}`;

  const formatDateTime = (value: string) => {
    const d = new Date(value);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  const statusColor: Record<ApplicationStatus, string> = {
    submitted: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="py-8 md:py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Application Details
            </h1>
            <p className="text-sm text-gray-600">
              Application ID:{" "}
              <span className="font-mono font-semibold">
                {application!.displayId || application!.id}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Submitted: {formatDateTime(application!.createdAt)}
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Applicant & Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Applicant</h2>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor[application!.status]}`}
                >
                  {application!.status.toUpperCase()}
                </span>
              </div>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-700">Full Name</dt>
                  <dd className="text-gray-900">{fullName}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${application!.email}`}
                      className="text-primary hover:text-primary/80"
                    >
                      {application!.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${application!.mobileNumber}`}
                      className="text-primary hover:text-primary/80"
                    >
                      {application!.mobileNumber}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Outside US</dt>
                  <dd className="text-gray-900">
                    {application!.outsideUS ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="font-medium text-gray-700">Address</dt>
                  <dd className="text-gray-900">{fullAddress}</dd>
                </div>
                {application!.referralSource && (
                  <div className="md:col-span-2">
                    <dt className="font-medium text-gray-700">Referral Source</dt>
                    <dd className="text-gray-900">{application!.referralSource}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Application Details
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-700">Preferred Gender</dt>
                  <dd className="capitalize text-gray-900">
                    {application!.preferredGender}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Activity Level</dt>
                  <dd className="text-gray-900">{application!.activityLevel}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Pickup Location</dt>
                  <dd className="text-gray-900">{application!.pickupLocation}</dd>
                </div>
                {application!.secondPickupLocation && (
                  <div>
                    <dt className="font-medium text-gray-700">
                      Second Pickup Location
                    </dt>
                    <dd className="text-gray-900">
                      {application!.secondPickupLocation}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium text-gray-700">Delivery Method</dt>
                  <dd className="text-gray-900">{application!.deliveryMethod}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Payment Method</dt>
                  <dd className="text-gray-900">
                    {application!.paymentMethod || "Not specified"}
                  </dd>
                </div>
                {application!.depositAmount != null && (
                  <div>
                    <dt className="font-medium text-gray-700">Deposit Amount</dt>
                    <dd className="text-gray-900">
                      ${application!.depositAmount.toLocaleString()}
                    </dd>
                  </div>
                )}
                <div className="md:col-span-2">
                  <dt className="font-medium text-gray-700">Breed Choices</dt>
                  <dd className="text-gray-900">
                    {Array.isArray(application!.breedChoices)
                      ? application!.breedChoices
                          .map((b: any) => b?.breed || "")
                          .filter(Boolean)
                          .join(", ")
                      : "—"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right: Flags & meta */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Household & Experience
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Has other pets</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.otherPets ? "Yes" : "No"}
                  </dd>
                </div>
                {application!.petTypes && (
                  <div>
                    <dt className="text-gray-700">Pet types</dt>
                    <dd className="text-gray-900">{application!.petTypes}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Has children</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.hasChildren ? "Yes" : "No"}
                  </dd>
                </div>
                {application!.childrenAges && (
                  <div>
                    <dt className="text-gray-700">Children ages</dt>
                    <dd className="text-gray-900">
                      {application!.childrenAges}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Has fence</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.hasFence ? "Yes" : "No"}
                  </dd>
                </div>
                {application!.alternativeExercise && (
                  <div>
                    <dt className="text-gray-700">Alternative exercise plan</dt>
                    <dd className="text-gray-900">
                      {application!.alternativeExercise}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">First dog</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.firstDog ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Previous puppies</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.previousPuppies}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Agreements & Preferences
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Interested in training</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.interestedInTraining ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Spay/Neuter agreement</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.spayNeuterAgreement ? "Accepted" : "No"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Text alerts</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.textAlerts ? "Enabled" : "Disabled"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Opt-in communications</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.optInCommunications ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-700">Welcome call</dt>
                  <dd className="font-medium text-gray-900">
                    {application!.welcomeCall ? "Requested" : "Not requested"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Narrative answers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Lifestyle
            </h2>
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {application!.lifestyle || "—"}
            </p>
          </div>
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Typical Day
            </h2>
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {application!.typicalDay || "—"}
            </p>
          </div>
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Why a Good Fit
            </h2>
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {application!.whyGoodFit || "—"}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}


