import { IUser } from "@/app/types/interfaces";

const fakeUsers: IUser[] = [
  {
    id: "a7e51bca-7490-4b61-af10-9d2369c4acdc",
    is_active: true,
    is_deleted: false,
    created_at: "2025-08-15T12:05:32.629Z",
    updated_at: "2025-08-16T14:36:53.812Z",
    deleted_at: null,
    phone_number: "+923069122722",
    phone_verified_at: "2025-08-16T14:36:53.777Z",
    reports_created: 4,
    paid_reports: 0,
    
  },
  {
    id: "e8f9a0b1-2c3d-4e4f-a88d-1cdd99b0b1a2",
    is_active: true,
    is_deleted: false,
    created_at: "2025-08-15T07:25:05.000Z",
    updated_at: "2025-08-15T07:25:05.000Z",
    deleted_at: null,
    phone_number: "+923009990000",
    phone_verified_at: "2025-08-15T07:25:05.000Z",
    reports_created: 3,
    paid_reports: 2,
  },
  {
    id: "d7a8b9c0-1f2e-4e3b-a66c-8fbb77a8a0e1",
    is_active: true,
    is_deleted: false,
    created_at: "2025-08-15T07:20:50.000Z",
    updated_at: "2025-08-15T07:20:50.000Z",
    deleted_at: null,
    phone_number: "+923007778899",
    phone_verified_at: "2025-08-15T07:20:50.000Z",
    reports_created: 3,
    paid_reports: 1,
  },
  {
    id: "c2d3f4b5-98cd-4a45-a54f-3aa8a44f5b99",
    is_active: true,
    is_deleted: false,
    created_at: "2025-08-15T07:15:40.000Z",
    updated_at: "2025-08-15T07:15:40.000Z",
    deleted_at: null,
    phone_number: "+923004445566",
    phone_verified_at: "2025-08-15T07:15:40.000Z",
    reports_created: 5,
    paid_reports: 0,
  },
  {
    id: "b4f6e3a1-12ab-4d73-b921-8caa6e66a2f5",
    is_active: true,
    is_deleted: false,
    created_at: "2025-08-15T07:10:15.000Z",
    updated_at: "2025-08-15T07:10:15.000Z",
    deleted_at: null,
    phone_number: "+923001112233",
    phone_verified_at: "2025-08-15T07:10:15.000Z",
    reports_created: 4,
    paid_reports: 4,
  },
  {
    id: "a7e51bca-7490-4b61-af10-9d2369c4acdb",
    is_active: true,
    is_deleted: false,
    created_at: "2025-08-15T07:05:32.629Z",
    updated_at: "2025-08-15T07:05:32.629Z",
    deleted_at: null,
    phone_number: "+923069122724",
    phone_verified_at: "2025-08-15T07:05:32.616Z",
    reports_created: 3,
    paid_reports: 2,
  },
];

export async function fetchFakeUsers(
  page: number = 1,
  search: string = ""
): Promise<{ data: IUser[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = fakeUsers.filter((u) =>
        u.phone_number.toLowerCase().includes(search.toLowerCase())
      );
      const pageSize = 3; // Simulate small pagination
      const start = (page - 1) * pageSize;
      resolve({
        data: filtered.slice(start, start + pageSize),
        total: filtered.length,
      });
    }, 500);
  });
}