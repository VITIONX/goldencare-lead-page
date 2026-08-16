"use client";

import { FormEvent, useState } from "react";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const genderOptions = [
  "Male",
  "Female",
  "Prefer Not to Answer",
];

const contactTimes = [
  "No Preference",
  "6am - 8am",
  "8am - 10am",
  "10am - 12pm",
  "12pm - 2pm",
  "2pm - 4pm",
  "4pm - 6pm",
  "6pm - 8pm",
  "8pm - 10pm",
  "After 10pm",
];

/* =========================================================
   COMPANY LOGOS
========================================================= */

const companyLogos = [
  {
    name: "Wellabe",
    src: "/images/logos/wellabe.png",
  },
  {
    name: "NGL",
    src: "/images/logos/ngl.png",
  },
  {
    name: "Nationwide",
    src: "/images/logos/nationwide.png",
  },
  {
    name: "Guaranty Income Life",
    src: "/images/logos/guaranty-white.png",
  },
  {
    name: "ManhattanLife",
    src: "/images/logos/manhattanlife.png",
  },
  {
    name: "GTL",
    src: "/images/logos/gtl.png",
  },
  {
    name: "Securian Financial",
    src: "/images/logos/securian.png",
  },
  {
    name: "Aetna",
    src: "/images/logos/aetna.png",
  },
  {
    name: "OneAmerica Financial",
    src: "/images/logos/americo.png",
  },
  {
    name: "Mutual of Omaha",
    src: "/images/logos/mutual-of-omaha.png",
  },
  {
    name: "F&G",
    src: "/images/logos/fg.png",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName:
        formData.get("firstName")?.toString().trim() || "",

      lastName:
        formData.get("lastName")?.toString().trim() || "",

      streetAddress:
        formData.get("streetAddress")?.toString().trim() || "",

      city:
        formData.get("city")?.toString().trim() || "",

      state:
        formData.get("state")?.toString() || "",

      zipCode:
        formData.get("zipCode")?.toString().trim() || "",

      email:
        formData.get("email")?.toString().trim() || "",

      phone:
        formData.get("phone")?.toString().trim() || "",

      age:
        formData.get("age")?.toString() || "",

      gender:
        formData.get("gender")?.toString() || "",

      spouseGender:
        formData.get("spouseGender")?.toString() || "",

      bestContactTime:
        formData.get("bestContactTime")?.toString() || "",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to submit the form."
        );
      }

      form.reset();

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Form submission error:",
        error
      );

      alert(
        "Sorry, something went wrong while submitting your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     SUBMIT ANOTHER REQUEST
  ========================================================= */

  const handleAnotherRequest = () => {
    setSubmitted(false);

    setTimeout(() => {
      document
        .getElementById("quote")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 50);
  };

  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">
        <div className="hero-overlay" />

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="site-header">
          <div className="logo">
            <img
              src="/images/logo.png"
              alt="Golden Care Financial"
            />
          </div>

          <div className="header-contact">
            <small>
              CONNECT WITH AN AGENT TODAY
            </small>

            <strong>
              (800) 719-8985
            </strong>
          </div>
        </header>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div className="hero-content">
          {/* LEFT CONTENT */}

          <div className="hero-copy">
            <p className="eyebrow">
              GOLDEN CARE FINANCIAL
            </p>

            <h1>
              Protect Your
              <br />
              Future With
              <br />
              Confidence.
            </h1>

            <p className="hero-description">
              Explore long-term care options designed
              to help protect your financial independence
              and prepare for the future.
            </p>

            <div className="hero-points">
              <span>
                ✓ Personalized guidance
              </span>

              <span>
                ✓ Flexible planning options
              </span>

              <span>
                ✓ No obligation to enroll
              </span>
            </div>
          </div>

          {/* =================================================
              QUOTE CARD
          ================================================= */}

          {!submitted ? (
            <div
              className="quote-card"
              id="quote"
            >
              <h2>
                Request a Quote
              </h2>

              <form
                onSubmit={handleSubmit}
              >
                {/* EMAIL / PHONE — MANDATORY */}

                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    autoComplete="email"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="555-555-1212*"
                    autoComplete="tel"
                    required
                  />
                </div>

                {/* ADDRESS */}

                <input
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  autoComplete="street-address"
                />

                {/* CITY / STATE / ZIP */}

                <div className="form-row three">
                  <input
                    type="text"
                    name="city"
                    placeholder="City*"
                    autoComplete="address-level2"
                    required
                  />

                  <select
                    name="state"
                    defaultValue=""
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
                      State*
                    </option>

                    {states.map(
                      (state) => (
                        <option
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      )
                    )}
                  </select>

                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code*"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                  />
                </div>

                {/* AGE / GENDER */}

                <div className="form-row">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age*"
                    min="1"
                    max="120"
                    inputMode="numeric"
                    required
                  />

                  <select
                    name="gender"
                    defaultValue=""
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
                      Gender*
                    </option>

                    {genderOptions.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* SPOUSE / CONTACT TIME */}

                <div className="form-row">
                  <select
                    name="spouseGender"
                    defaultValue=""
                  >
                    <option
                      value=""
                      disabled
                    >
                      If married spouse&apos;s Gender
                    </option>

                    {genderOptions.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}
                  </select>

                  <select
                    name="bestContactTime"
                    defaultValue=""
                  >
                    <option
                      value=""
                      disabled
                    >
                      Best time to contact you
                    </option>

                    {contactTimes.map(
                      (time) => (
                        <option
                          key={time}
                          value={time}
                        >
                          {time}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* DISCLAIMER */}

                <p className="disclaimer">
                  * This is a solicitation for
                  insurance. By providing the information
                  above, I grant permission for a licensed
                  insurance agent to call or email me for
                  the purpose of receiving an insurance
                  quote. No obligation to enroll.
                </p>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="quote-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "SUBMITTING..."
                    : "SUBMIT"}
                </button>
              </form>
            </div>
          ) : (
            /* =================================================
               THANK YOU CARD
            ================================================= */

            <div
              className="thank-you-card"
              id="quote"
            >
              <div className="thank-you-icon">
                ✓
              </div>

              <h2>
                Thank You!
              </h2>

              <p>
                Your information has been
                submitted successfully.
                <br />
                A licensed insurance agent
                will contact you regarding
                your quote.
              </p>

              <button
                type="button"
                className="thank-you-button"
                onClick={
                  handleAnotherRequest
                }
              >
                SUBMIT ANOTHER REQUEST
              </button>
            </div>
          )}
        </div>

        {/* =====================================================
            COMPANY LOGO MARQUEE
        ===================================================== */}

        <div className="company-marquee">
          <div className="company-marquee-track">
            {/* FIRST LOGO SET */}

            <div className="company-logo-set">
              {companyLogos.map(
                (company) => (
                  <div
                    className="company-logo"
                    key={`first-${company.name}`}
                  >
                    <img
                      src={company.src}
                      alt={company.name}
                    />
                  </div>
                )
              )}
            </div>

            {/* DUPLICATE LOGO SET */}

            <div
              className="company-logo-set"
              aria-hidden="true"
            >
              {companyLogos.map(
                (company) => (
                  <div
                    className="company-logo"
                    key={`second-${company.name}`}
                  >
                    <img
                      src={company.src}
                      alt=""
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO SECTION
      ===================================================== */}

      <section className="intro-section">
        <p className="eyebrow">
          QUALITY CARE &amp; FINANCIAL INDEPENDENCE
        </p>

        <h2>
          Prepare today for
          <br />
          tomorrow&apos;s possibilities.
        </h2>

        <p>
          Long-term care planning can help you
          protect your financial independence
          while preparing for the future.
        </p>

        <div className="info-grid">
          {/* CARD 01 */}

          <div className="info-card">
            <div className="info-icon">
              01
            </div>

            <h3>
              Plan Ahead
            </h3>

            <p>
              Prepare for potential long-term
              care needs before they become an
              unexpected financial burden.
            </p>
          </div>

          {/* CARD 02 */}

          <div className="info-card">
            <div className="info-icon">
              02
            </div>

            <h3>
              Protect Your Assets
            </h3>

            <p>
              Explore planning options designed
              to help protect the assets you have
              worked hard to build.
            </p>
          </div>

          {/* CARD 03 */}

          <div className="info-card">
            <div className="info-icon">
              03
            </div>

            <h3>
              Personalized Guidance
            </h3>

            <p>
              Get information based on your
              individual situation and long-term
              financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CARE PLANNING
      ===================================================== */}

      <section className="care-section">
        <div className="care-content">
          <p className="eyebrow">
            PLAN WITH PURPOSE
          </p>

          <h2>
            Quality care starts
            <br />
            with a smart plan.
          </h2>

          <p>
            The right long-term care strategy
            can help you prepare for changing
            needs while maintaining greater
            financial independence.
          </p>

          <a
            href="#quote"
            className="gold-button"
          >
            REQUEST A QUOTE
          </a>
        </div>

        <div className="care-image">
          <img
            src="/images/care.jpg"
            alt="Family planning for the future"
          />
        </div>
      </section>

      {/* =====================================================
          TRUST SECTION
      ===================================================== */}

      <section className="trust-section">
        <div className="trust-inner">
          <p className="eyebrow">
            YOUR FUTURE MATTERS
          </p>

          <h2>
            Prepare today.
            <br />
            Protect tomorrow.
          </h2>

          <p>
            Golden Care Financial is here to
            help you understand your options
            and make informed decisions about
            your long-term care needs.
          </p>

          <a
            href="#quote"
            className="trust-button"
          >
            GET STARTED
          </a>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta">
        <p className="eyebrow">
          TAKE THE NEXT STEP
        </p>

        <h2>
          Let&apos;s plan for
          <br />
          what comes next.
        </h2>

        <p>
          Complete the quote form above to
          connect with Golden Care Financial
          and explore your options.
        </p>

        <a
          href="#quote"
          className="gold-button"
        >
          REQUEST A QUOTE
        </a>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="site-footer">
        <div className="footer-logo">
          GOLDEN
          <span>CARE</span>
        </div>

        <p>
          © 2026 Golden Care Financial.
          All rights reserved.
        </p>

        <div className="footer-links">
          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Terms &amp; Conditions
          </a>
        </div>
      </footer>
    </main>
  );
}