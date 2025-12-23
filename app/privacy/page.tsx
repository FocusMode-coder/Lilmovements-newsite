export const metadata = {
  title: "Privacy Policy · Lil Movements",
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Privacy Policy</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. Information We Collect</h2>
        <p>We collect information you provide directly and automatically through your use of our services:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Contact information (name, email) when you reach out to us</li>
          <li>Usage data (pages visited, time spent, interactions)</li>
          <li>Device information (browser type, IP address, operating system)</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide and improve our movement education content and services</li>
          <li>Respond to your inquiries and communications</li>
          <li>Send updates and educational content (with your consent)</li>
          <li>Analyze usage patterns and optimize user experience</li>
          <li>Prevent fraud and ensure platform security</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. Third-Party Services</h2>
        <p>We use trusted third-party services that may collect and process your data:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><a href="https://policies.google.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Google Analytics</a> - Website analytics and user behavior</li>
          <li><a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Meta Pixel</a> - Advertising and retargeting on Facebook/Instagram</li>
          <li><a href="https://www.tiktok.com/legal/page/global-privacy-policy/en" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">TikTok Pixel</a> - Advertising and analytics on TikTok</li>
        </ul>
        <p>Each service operates under its own privacy policy. We are not responsible for third-party data practices.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Cookies & Tracking</h2>
        <p>
          We use cookies and similar technologies for functionality, analytics, and marketing. You can manage
          your preferences through our cookie banner. For details, see our{" "}
          <a href="/cookies" className="underline underline-offset-2">Cookie Policy</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Data Sharing</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service providers who help operate our platform</li>
          <li>Analytics and advertising partners (with your consent)</li>
          <li>Legal authorities when required by law</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">6. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your information, including encryption and
          secure servers. However, no method of transmission over the internet is 100% secure, and we cannot 
          guarantee absolute security.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for processing</li>
          <li>Object to certain processing activities</li>
          <li>Data portability</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:info.lilmovements@gmail.com" className="underline underline-offset-2">
            info.lilmovements@gmail.com
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">8. Data Retention</h2>
        <p>
          We retain your information as long as necessary to provide services or as required by law. 
          We may retain certain data for legitimate business purposes such as fraud prevention and 
          legal compliance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">9. International Transfers</h2>
        <p>
          Your information may be processed in countries other than your residence. We ensure appropriate
          safeguards are in place for international data transfers in compliance with applicable laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">10. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect personal
          information from children under 13. If you believe we have collected such information, please 
          contact us immediately.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">11. Policy Updates</h2>
        <p>
          We may update this policy periodically. Material changes will be communicated via email
          or prominent notice on our website. Continued use after changes constitutes acceptance of 
          the updated policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">12. Contact Us</h2>
        <p>
          Questions about privacy? Email us at{" "}
          <a href="mailto:info.lilmovements@gmail.com" className="underline underline-offset-2">
            info.lilmovements@gmail.com
          </a>.
        </p>
      </section>
    </main>
  );
}