import React from 'react';
import { Button } from '../ui/button';

export function Welcome() {
  return (
    <div className="p-6 text-white">
      <div className="bg-[#2E2E2E] rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Admin Portal</h2>
        <p className="text-gray-200 mb-4">
          Welcome to the Yeshua Beth Hallel Ministries admin portal. Use this portal to manage site content,
          including the home page, ministries, gallery, news, resources, stories, and administrative users.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Overview</h3>
            <p className="text-gray-300">
              - <strong>Home</strong>: Manage homepage content and hero images.
            </p>
            <p className="text-gray-300">
              - <strong>About</strong>: Edit the about page content and leadership bios.
            </p>
            <p className="text-gray-300">
              - <strong>Ministries</strong>: Update ministries and related information.
            </p>
            <p className="text-gray-300">
              - <strong>Gallery</strong>: Upload and manage images and media.
            </p>
            <p className="text-gray-300">
              - <strong>News</strong>: Post and manage news articles.
            </p>
            <p className="text-gray-300">
              - <strong>Resources</strong>: Manage downloadable resources and documents.
            </p>
            <p className="text-gray-300">
              - <strong>Stories</strong>: Review and publish testimonies.
            </p>
            <p className="text-gray-300">
              - <strong>Donate</strong>: Manage donation pages and giving options.
            </p>
            <p className="text-gray-300">- <strong>Users</strong>: Manage admin users and permissions.</p>
          </div>

          {/* Getting Started removed as requested */}

          {/* Standard Information removed as requested */}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
