import { useState, useMemo } from 'react';
import { Edit2, Trash2, Search, Hash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import useIsMobile from '@/Hooks/useIsMobile';
import { PATHS } from '@/data/paths';
import Button from '@/components/atoms/Button';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import { DeleteWarningContent } from '../DeleteWarningContent';
import { DataTableBodyProps } from '@/interfaces';
import { renderCell } from '@/utils/renderCell';
import { formatHeader } from '@/utils/formatHeader';
import { getVisibleColumns } from '@/utils/visibleColumns';
import UserPermissionsDrawer from '../UserPermissionsDrawer';
import { FaUsers } from 'react-icons/fa6';

const DataTableBody = <T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  searchTerm,
  showEdit,
  showActionsColumn = true,
  onRowPatched,
  deleteLocation,
}: DataTableBodyProps<T>) => {
  const [openUserId, setOpenUserId] = useState<string | null>(null);

  // Delete DialogDrawer
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const isOrdersPage = pathname?.includes('/dashboard/orders');
  const isUsersPage = pathname?.includes('/dashboard/users');

  // Hooks
  const isMobile = useIsMobile();

  // === visibleColumns ===
  const visibleColumns = useMemo(
    () => getVisibleColumns(columns, data),
    [columns, data],
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center">
        <thead className="bg-gray-50">
          <tr className="truncate whitespace-nowrap overflow-hidden">
            {visibleColumns.map((col) => (
              <th
                key={String(col)}
                className="px-6 py-3 text-sm font-medium text-gray-500"
              >
                {formatHeader(String(col))}
              </th>
            ))}
            {showActionsColumn && (onEdit || onDelete) && (
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row) => {
              const rowLink = isOrdersPage
                ? PATHS.DASHBOARD.ORDERS.ITEM(String(row.id))
                : undefined;

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${
                    isOrdersPage ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => rowLink && router.push(rowLink)}
                >
                  {visibleColumns.map((col) => (
                    <td
                      key={String(col)}
                      className={
                        col === 'image'
                          ? 'py-3'
                          : `px-6 py-4 ${col === 'gallery' ? 'min-w-xs' : col === 'avatar_url' ? 'min-w-[200px]' : 'max-w-xs'} truncate whitespace-nowrap overflow-hidden`
                      }
                    >
                      {renderCell(col, row)}
                    </td>
                  ))}
                  {showActionsColumn && (onEdit || onDelete) && (
                    <td className="px-2 space-x-1 whitespace-nowrap">
                      {onEdit && showEdit !== false ? (
                        <Button
                          handleClick={() => onEdit(row.id)}
                          aria-label="Edit item"
                          otherClassName="px-4! bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                        </Button>
                      ) : (
                        isUsersPage && (
                          <UserPermissionsDrawer
                            userId={row.id}
                            trigger={
                              <Button
                                handleClick={() => setOpenUserId(row.id)}
                                otherClassName="px-4! rounded-lg bg-transparent text-gray-400 hover:text-(--forth-color) hover:bg-[#58beb928]! transition-colors"
                              >
                                <FaUsers className="h-4 w-4" />
                              </Button>
                            }
                            open={openUserId === row.id}
                            setOpen={(val: boolean) =>
                              setOpenUserId(val ? row.id : null)
                            }
                            onUpdated={(updatedData) =>
                              onRowPatched?.(row.id, updatedData)
                            }
                          />
                        )
                      )}
                      {onDelete && (
                        <ResponsiveDialogDrawer
                          trigger={
                            <Button
                              handleClick={() =>
                                setOpenDeleteId(String(row.id))
                              }
                              aria-label="Delete item"
                              otherClassName="px-4! text-gray-400 bg-transparent hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                          open={openDeleteId === String(row.id)}
                          setOpen={(val) =>
                            setOpenDeleteId(val ? String(row.id) : null)
                          }
                          isMobile={isMobile}
                          contentClassName="px-4! max-sm:pb-10!"
                          showLastTwo={false}
                        >
                          <DeleteWarningContent
                            isMobile={isMobile}
                            deleteLocation={deleteLocation}
                            item={
                              row?.name ||
                              row?.title ||
                              row?.display_name ||
                              row?.email ||
                              `#${row.id}`
                            }
                            onCancel={() => setOpenDeleteId(null)}
                            onDelete={() => {
                              onDelete(row.id);
                              setOpenDeleteId(null);
                            }}
                          />
                        </ResponsiveDialogDrawer>
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={visibleColumns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-12 text-center text-gray-500"
              >
                {searchTerm ? (
                  <div>
                    <Search className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No items found matching {searchTerm}</p>
                  </div>
                ) : (
                  <div>
                    <Hash className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No items available</p>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableBody;
