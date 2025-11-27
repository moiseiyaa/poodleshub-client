'use client';

import Link from 'next/link';
import { FaFileContract, FaGavel, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Container from '../components/organisms/Container';

/**
 * Terms of Service page component
 * Comprehensive terms and conditions
 */
const TermsPage = () => {
  const lastUpdated = 'January 1, 2025';

  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <FaFileContract className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-700">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 space-y-8">
            {/* Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using the PuppyHub USA website and services, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from 
                using or accessing this site.
              </p>
              <p className="text-gray-700">
                These terms apply to all visitors, users, and others who access or use our services.
              </p>
            </section>

            {/* Use License */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access the materials on PuppyHub USA's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under 
                this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p className="text-gray-700 mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated 
                by PuppyHub USA at any time.
              </p>
            </section>

            {/* Adoption Process */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Adoption Process and Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Application Process</h3>
              <p className="text-gray-700 mb-4">
                By submitting an adoption application, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>All information provided is accurate and truthful</li>
                <li>Submission of an application does not guarantee approval</li>
                <li>We reserve the right to reject any application at our sole discretion</li>
                <li>Application review typically takes 4-5 business days</li>
                <li>We may request additional information or documentation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Deposit Policy</h3>
              <p className="text-gray-700 mb-4">
                <strong>Deposit Amount:</strong> A $300 deposit is required per puppy to secure your place on our waiting list.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Refund Policy:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Deposits are refundable (minus a 9% processing fee) for up to 2 years from the deposit date if you have not selected a specific puppy</li>
                <li>Once you reserve a specific puppy, the deposit becomes non-refundable and will be applied to the balance of that puppy on Adoption Day</li>
                <li>Refund requests must be submitted in writing</li>
                <li>Processing fees are non-refundable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Puppy Selection</h3>
              <p className="text-gray-700 mb-4">
                Upon approval of your application and payment of deposit:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>You will receive litter announcements matching your preferences</li>
                <li>You may choose a puppy from available litters or pass on litters</li>
                <li>Puppy selection is on a first-come, first-served basis</li>
                <li>Once a specific puppy is reserved, the deposit becomes non-refundable</li>
              </ul>
            </section>

            {/* Health Guarantee */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Guarantee</h2>
              <p className="text-gray-700 mb-4">
                All puppies come with our 12-year health guarantee covering genetic conditions. The guarantee is subject to 
                the terms and conditions outlined in our Health Guarantee document. Please review the full guarantee details 
                on our <Link href="/health-guarantee" className="text-primary hover:text-primary/80">Health Guarantee page</Link>.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                <strong>Payment Methods:</strong> We accept credit cards, debit cards, Apple Pay, Google Pay, bank transfers, and Binance as specified on our website.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Payment Schedule:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Deposit: $300 per puppy (required to secure your place)</li>
                <li>Balance: Remaining adoption fee is due on or before Adoption Day</li>
                <li>All payments are processed securely through our payment providers</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Late Payments:</strong> Failure to pay the balance by the agreed date may result in forfeiture of 
                your deposit and reservation.
              </p>
            </section>

            {/* Delivery and Pickup */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery and Pickup</h2>
              <p className="text-gray-700 mb-4">
                Puppies are typically ready for pickup or delivery at 8-10 weeks of age. We offer several delivery options:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>In-person pickup at our locations (free)</li>
                <li>Ground transportation (fees apply)</li>
                <li>Air transportation with flight nanny (fees apply)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Delivery fees and arrangements will be discussed and agreed upon before finalizing your adoption. 
                See our <Link href="/delivery" className="text-primary hover:text-primary/80">Delivery page</Link> for more information.
              </p>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaExclamationTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                Limitations and Disclaimers
              </h2>
              <p className="text-gray-700 mb-4">
                In no event shall PuppyHub USA or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
                use the materials on PuppyHub USA's website, even if PuppyHub USA or a PuppyHub USA authorized representative 
                has been notified orally or in writing of the possibility of such damage.
              </p>
              <p className="text-gray-700 mb-4">
                Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for 
                consequential or incidental damages, these limitations may not apply to you.
              </p>
            </section>

            {/* Accuracy of Materials */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
              <p className="text-gray-700 mb-4">
                The materials appearing on PuppyHub USA's website could include technical, typographical, or photographic errors. 
                PuppyHub USA does not warrant that any of the materials on its website are accurate, complete, or current. 
                PuppyHub USA may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
              <p className="text-gray-700 mb-4">
                PuppyHub USA has not reviewed all of the sites linked to its website and is not responsible for the contents 
                of any such linked site. The inclusion of any link does not imply endorsement by PuppyHub USA of the site. 
                Use of any such linked website is at the user's own risk.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
              <p className="text-gray-700 mb-4">
                PuppyHub USA may revise these terms of service for its website at any time without notice. By using this 
                website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaGavel className="h-6 w-6 text-primary mr-3" />
                Governing Law
              </h2>
              <p className="text-gray-700 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of the State of Colorado, 
                United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>PuppyHub USA</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  1234 Puppy Lane<br />
                  Denver, CO 80202
                </p>
                <p className="text-gray-700 mb-2">
                  Email: <a href="mailto:puppyhubusa@gmail.com" className="text-primary hover:text-primary/80">puppyhubusa@gmail.com</a>
                </p>
                <p className="text-gray-700">
                  Phone: <a href="tel:+19092654575" className="text-primary hover:text-primary/80">+1 909 265-4575</a>
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start">
                <FaCheckCircle className="h-6 w-6 text-primary mt-1 mr-3 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Acknowledgment</h3>
                  <p className="text-gray-700">
                    By using our services, you acknowledge that you have read, understood, and agree to be bound by these 
                    Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 text-center space-x-6">
            <Link 
              href="/" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/privacy" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;

