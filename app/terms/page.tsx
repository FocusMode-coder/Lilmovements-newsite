export const metadata = {
  title: "Terms of Service · Lil Movements",
  robots: { index: true },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Terms of Service</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>Lil Movements</strong> ("we", "our", "us"), you agree to these Terms of Service 
          and to our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>. If you do not agree 
          to all terms, you must discontinue use immediately.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. Eligibility</h2>
        <p>
          You must be at least 18 years old to use our services. If you are under 18, you must have parental consent.
          You agree to provide accurate information when contacting us or interacting with our content.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. Educational Purpose & Medical Disclaimer</h2>
        <p>
          <strong>Our content is for educational and informational purposes only and does not constitute medical, 
          health, or fitness advice.</strong> We are not healthcare providers. Always consult qualified healthcare 
          professionals before beginning any exercise program. See our{" "}
          <a href="/legal/health" className="underline underline-offset-2">Health & Safety Guidelines</a> for 
          full details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Assumption of Risk & Release of Liability</h2>
        <p>
          <strong>You acknowledge that physical movement and exercise activities involve inherent risks including 
          injury.</strong> By using our content, you voluntarily assume all risks and, to the maximum extent permitted 
          by law, you release and hold harmless Lil Movements, its instructors, and affiliates from any liability 
          for injuries or damages arising from your participation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Intellectual Property & License</h2>
        <p>
          All content, including videos, text, graphics, logos, and choreography, is owned by Lil Movements and 
          protected by copyright and trademark laws. We grant you a limited, non-exclusive, non-transferable license 
          to view our content for personal, non-commercial use only.
        </p>
        <p>
          You may not copy, download, reproduce, distribute, modify, or create derivative works from our content 
          without express written permission. Unauthorized use may result in legal action.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">6. User Conduct</h2>
        <p>
          You agree not to misuse our platform or content. Prohibited activities include but are not limited to: 
          harassment, posting offensive content, attempting to hack or disrupt services, scraping or automated data 
          collection, and infringing on others' intellectual property rights.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">7. Third-Party Services & Links</h2>
        <p>
          We may use third-party services (such as analytics and social media platforms) and link to external websites. 
          We are not responsible for the content, privacy practices, or terms of third-party services. Your interactions 
          with third parties are governed by their own terms and policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">8. Disclaimer of Warranties</h2>
        <p>
          <strong>Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied.</strong> 
          We do not guarantee uninterrupted access, error-free content, or specific fitness results. Your use is at your 
          sole risk.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">9. Limitation of Liability</h2>
        <p>
          <strong>To the maximum extent permitted by law, Lil Movements and its affiliates shall not be liable for any 
          indirect, incidental, consequential, or punitive damages</strong> arising from your use of our services, including 
          but not limited to personal injury, property damage, lost profits, or data loss.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">10. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Lil Movements, its instructors, employees, and affiliates 
          from any claims, liabilities, damages, and expenses (including attorney fees) arising from your use of our 
          services, violation of these terms, or infringement of third-party rights.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">11. Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of California, United States, without regard to conflict 
          of laws principles. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in 
          Los Angeles County, California.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">12. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Material changes will be communicated via email or 
          prominent notice on our website. Continued use after changes constitutes acceptance of the modified terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">13. Severability</h2>
        <p>
          If any provision of these terms is found to be unenforceable, the remaining provisions will continue in 
          full effect. These terms, together with our Privacy Policy and other referenced policies, constitute the 
          entire agreement between you and Lil Movements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">14. Contact</h2>
        <p>
          Questions or legal inquiries? Email us at{" "}
          <a href="mailto:info.lilmovements@gmail.com" className="underline underline-offset-2">
            info.lilmovements@gmail.com
          </a>.
        </p>
      </section>
    </main>
  );
}