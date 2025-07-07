import React from "react";

const FrequentlyAsked = () => {
  return (
    <div className="py-16">
      <h1 className="text-4xl text-center font-bold">
        Frequently Asked Question (FAQ)
      </h1>

      <p className="text-center py-3 ">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, <br></br> reduce pain, and strengthen your
        body with ease!
      </p>

      <div className="space-y-5">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="checkbox" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAsked;
