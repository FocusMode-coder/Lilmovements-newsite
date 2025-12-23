export const metadata = {
  title: "Access Terms · Lil Movements",
  robots: { index: true },
};

export default function AccessTermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Access Terms</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. Content Access</h2>
        <p>
          Lil Movements provides educational movement content for personal use. Access to our content is 
          subject to these terms and our main{" "}
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. Personal Use Only</h2>
        <p>
          Our content is provided for your personal, non-commercial use only. You may not share, redistribute, 
          copy, or use our content for commercial purposes without express written permission.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. Account Responsibility</h2>
        <p>
          If you create an account, you are responsible for maintaining the confidentiality of your login 
          credentials and for all activities under your account. Notify us immediately of any unauthorized 
          access.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Prohibited Activities</h2>
        <p>
          You may not: record, download, or capture our content without permission; share account credentials; 
          use automated tools to scrape or download content; or use our platform in any way that violates our 
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a> or applicable laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Service Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of our services at any time 
          without prior notice. We are not liable for any modifications or interruptions to our services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">6. Termination</h2>
        <p>
          We may suspend or terminate your access at any time for violations of these terms or our policies. 
          Upon termination, your right to access our content immediately ceases.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">7. Content Availability</h2>
        <p>
          We do not guarantee that all content will be available at all times. Content may be updated, removed, 
          or replaced without notice. We are not responsible for any loss of access to specific content.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">8. Related Policies</h2>
        <p>
          These access terms are part of our{" "}
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a> and should be read 
          alongside our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a> and{" "}
          <a href="/legal/health" className="underline underline-offset-2">Health & Safety Guidelines</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">9. Contact</h2>
        <p>
          Questions about access or content? Contact{" "}
          <a href="mailto:info.lilmovements@gmail.com" className="underline underline-offset-2">
            info.lilmovements@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}