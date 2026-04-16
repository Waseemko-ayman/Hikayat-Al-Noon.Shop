/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/lib/toast';
import { useUpdateContent } from '@/context/updateContentContext';
import useAPI from '@/Hooks/useAPI';
import SettingsTab from '../molecules/SettingsTab';
import { DataTable } from '../molecules/DataTable';
import { GenericAllProps } from '@/interfaces';

const GenericAllTable = ({
  value,
  title,
  description,
  tableName,
  createTabValue,
  placeholder,
  onEditIdChange,
  onTabChange,
  showEdit,
  showActionsColumn,
  refreshKeyProp,
  customFilter,
  filterOptions,
  onFilterChange,
  deleteLocation,
  data: externalData,
  isLoading: externalLoading,
  error: externalError,
}: GenericAllProps) => {
  // --- Filter State ---
  const [filter, setFilter] = useState('all');
  const [rows, setRows] = useState<any[]>([]);

  const { showToast } = useToast();

  const { refreshFlags } = useUpdateContent();
  const refreshKey = refreshKeyProp || tableName || 'default';

  const {
    get,
    data: apiData,
    isLoading: apiLoading,
    error: apiError,
  } = useAPI<any>(tableName || '');

  const { del } = useAPI(tableName || '');

  // 👇 decide source
  const finalData = externalData ?? apiData;
  const finalLoading = externalLoading ?? apiLoading;
  const finalError = externalError ?? apiError;

  const handleEdit = (id: string | number) => {
    onEditIdChange?.(id);
    if (createTabValue && onTabChange) {
      onTabChange(createTabValue);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!tableName) return;

    try {
      // ⚠️ خاصية profiles فقط
      if (tableName === 'profiles') {
        // 1️⃣ حذف من auth.users عبر API route آمن
        await fetch('/api/delete-user', {
          method: 'DELETE',
          body: JSON.stringify({ userId: id }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await del(id);
      showToast('Deleted successfully');

      // Instead of get(), we delete the row directly from rows
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      const apiError = (err as any)?.response?.message;
      showToast(apiError, 'error');
    }
  };

  useEffect(() => {
    const list = Array.isArray(finalData) ? finalData : [];
    setRows(list);
  }, [finalData]);

  const patchRow = (id: string | number, patch: Partial<any>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const filteredRows = useMemo(() => {
    if (customFilter) return customFilter(rows, filter);
    if (filter === 'all') return rows;
    return rows; // بدون فلترة إذا لم يتم تمرير customFilter
  }, [rows, filter, customFilter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    // استدعاء الدالة الممررة من المكون الأب إذا كانت موجودة
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  // 👇 fetch only if there is no external data
  useEffect(() => {
    if (!externalData && tableName) {
      get();
    }
  }, [tableName, refreshFlags[refreshKey]]);

  return (
    <SettingsTab
      value={value}
      title={title}
      description={description}
      cardContentClassName="!p-0"
    >
      <DataTable
        placeholder={placeholder}
        data={filteredRows}
        onRowPatched={patchRow}
        onEdit={handleEdit}
        onDelete={tableName ? handleDelete : undefined}
        showEdit={showEdit}
        showActionsColumn={showActionsColumn}
        filter={filter}
        setFilter={handleFilterChange}
        filterOptions={filterOptions}
        isLoading={finalLoading}
        error={finalError}
        deleteLocation={deleteLocation}
      />
    </SettingsTab>
  );
};

export default GenericAllTable;
