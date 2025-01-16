import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen text-white">
      <Head>
        <title>Privacy Policy - ArvynFi</title>
        <meta
          name="description"
          content="Privacy Policy for ArvynFi crypto wallet and swap platform."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Privacy Policy for ArvynFi
        </h1>
        <p className="text-sm text-center mb-10">
          Last updated: January 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Introduction
          </h2>
          <p className="leading-7">
            At ArvynFi, we respect your privacy and are committed to protecting
            the personal information you share with us. This Privacy Policy
            outlines how we collect, use, and safeguard your data when you use
            our services, including the ArvynFi wallet and token swapping
            platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p className=" leading-7 mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-5">
            <li className="mb-2">
              <strong>Personal Information:</strong> When you create an account
              with us, we may collect personal details such as your name, email
              address, and wallet information.
            </li>
            <li className="mb-2">
              <strong>Transaction Data:</strong> Information about transactions
              you perform, including tokens swapped, timestamps, and wallet
              addresses.
            </li>
            <li>
              <strong>Usage Data:</strong> Information on how you interact with
              our platform, such as page views, IP addresses, browser types, and
              device details.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="leading-7 mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-5">
            <li className="mb-2">To provide and maintain our services.</li>
            <li className="mb-2">
              To process your token swaps and transactions.
            </li>
            <li className="mb-2">
              To communicate with you about your account and transactions.
            </li>
            <li className="mb-2">
              To improve features and performance of our platform.
            </li>
            <li>To comply with legal obligations and prevent fraud.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold  mb-4">
            Data Sharing and Disclosure
          </h2>
          <p className=" leading-7 mb-4">
            We do not sell or share your personal data with third parties except
            in the following cases:
          </p>
          <ul className="list-disc pl-5 ">
            <li className="mb-2">
              <strong>Legal Requirements:</strong> If required by law or to
              protect our rights and comply with legal processes.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with trusted third-party service providers who help us run our
              platform, such as payment processors and cloud hosting services,
              under strict data protection agreements.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold  mb-4">
            Data Security
          </h2>
          <p className=" leading-7">
            We take the security of your personal information seriously and use
            industry-standard encryption techniques to protect it. However,
            please note that no method of transmission over the Internet or
            electronic storage is completely secure. While we strive to protect
            your data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold  mb-4">
            Your Data Protection Rights
          </h2>
          <p className=" leading-7 mb-4">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5 ">
            <li className="mb-2">The right to access your personal data.</li>
            <li className="mb-2">
              The right to correct any inaccuracies in your personal data.
            </li>
            <li className="mb-2">
              The right to request the deletion of your personal data.
            </li>
            <li className="mb-2">
              The right to withdraw consent for processing your data.
            </li>
            <li>The right to request the portability of your data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold  mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className=" leading-7">
            We use cookies and similar technologies to enhance your experience
            on our platform. These technologies help us analyze how you use the
            platform, improve performance, and personalize your experience.
          </p>
          <p className=" leading-7 mt-4">
            You can control cookies through your browser settings, but please
            note that disabling cookies may affect your experience on our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold  mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className=" leading-7">
            We may update this Privacy Policy from time to time. When we do, we
            will post the updated policy on this page with a new Last Updated
            date. We encourage you to review this Privacy Policy periodically to
            stay informed about how we protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold  mb-4">
            Contact Us
          </h2>
          <p className=" leading-7">
            If you have any questions about this Privacy Policy or how we handle
            your data, please contact us:
          </p>
          <ul className="list-none  mt-4">
            <li>
              Email:{" "}
              <a
                href="mailto:support@arvynfi.com"
                className="underline"
              >
                support@arvynfi.com
              </a>
            </li>
            <li>Address: ArvynFi, 123 Blockchain Avenue, Lagos, Nigeria</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
