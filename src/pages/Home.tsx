
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-health-soft via-white to-health-soft py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-health-dark">
                  Secure Health Records on Blockchain
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  HealthVault provides tamper-proof health records management using blockchain technology,
                  giving patients control and enabling seamless verification.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/patient">
                  <Button className="bg-health-primary hover:bg-health-secondary">
                    Patient Portal
                  </Button>
                </Link>
                <Link to="/hospital">
                  <Button variant="outline" className="border-health-primary text-health-primary hover:bg-health-soft">
                    Hospital Portal
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-full bg-health-soft p-4 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-gradient-to-br from-health-primary to-health-blue rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-health-soft px-3 py-1 text-sm text-health-primary">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-health-dark">
                Revolutionizing Health Records Management
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                HealthVault combines blockchain technology with healthcare expertise to create a secure, efficient system.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="p-3 rounded-full bg-health-soft text-health-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-health-dark">Patient Ownership</h3>
              <p className="text-sm text-gray-500 text-center">
                Patients own and control access to their complete medical history through a secure interface.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="p-3 rounded-full bg-health-soft text-health-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-health-dark">Tamper-Proof Records</h3>
              <p className="text-sm text-gray-500 text-center">
                Blockchain technology ensures health records cannot be altered or falsified once entered.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="p-3 rounded-full bg-health-soft text-health-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-health-dark">Instant Verification</h3>
              <p className="text-sm text-gray-500 text-center">
                Healthcare providers can instantly verify the authenticity of any medical document.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 md:py-24 bg-health-soft/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-health-primary px-3 py-1 text-sm text-white">
                Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-health-dark">
                How HealthVault Works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our blockchain solution simplifies health records management while maximizing security.
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-primary text-white text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2 text-health-dark">Hospital Issues Record</h3>
              <p className="text-gray-500">Healthcare providers create and digitally sign medical records on the blockchain.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-primary text-white text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2 text-health-dark">Patient Controls Access</h3>
              <p className="text-gray-500">Patients manage who can view their records and for how long through secure permissions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-primary text-white text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2 text-health-dark">Instant Verification</h3>
              <p className="text-gray-500">Any healthcare provider can verify record authenticity through the blockchain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24 bg-health-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to secure your health records?
              </h2>
              <p className="text-health-light md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join HealthVault today and take control of your medical history.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button size="lg" className="bg-white text-health-primary hover:bg-health-light">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-health-primary/80">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
