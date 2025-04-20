import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export function VehicleList({ vehicles, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredVehicles = vehicles.filter((vehicle) =>
    Object.values(vehicle).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-2xl border border-green-100 bg-white/80 backdrop-blur-sm">
      <div className="p-4 border-b border-green-100">
        <h2 className="text-xl font-semibold text-green-800 mb-4">{title}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-green-100 bg-green-50/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
                S#
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
                Reg No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
                Engine No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
                Speed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {paginatedVehicles.map((vehicle, index) => (
              <tr
                key={index}
                className="hover:bg-green-50/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex h-2 w-2 rounded-full ${
                      vehicle.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {vehicle.customerName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {vehicle.regNo}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {vehicle.engineNo}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {vehicle.speed} km/h
                </td>
              </tr>
            ))}

            {/* Empty rows to maintain table size */}
            {Array.from(
              { length: itemsPerPage - paginatedVehicles.length },
              (_, index) => (
                <tr key={`empty-${index}`}>
                  <td className="px-4 py-3">&nbsp;</td>
                  <td className="px-4 py-3">&nbsp;</td>
                  <td className="px-4 py-3">&nbsp;</td>
                  <td className="px-4 py-3">&nbsp;</td>
                  <td className="px-4 py-3">&nbsp;</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-green-100 px-4 py-3">
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of{" "}
          {filteredVehicles.length} entries
        </span>
        <div className="flex gap-1">
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredVehicles.length}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border border-green-100 p-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 text-green-700"
    >
      {children}
    </button>
  );
}
