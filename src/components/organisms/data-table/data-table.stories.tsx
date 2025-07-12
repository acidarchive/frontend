import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { PaginatedResponseTB303PatternSummaryRecordsItem } from '@/api/generated/model';
import { columns } from '@/components/organisms/data-table';
import {
  DataTable,
  DataTableProps,
} from '@/components/organisms/data-table/data-table';
import { useDataTableFilters } from '@/hooks/use-data-table-filters';

const queryClient = new QueryClient();

const initialMockData: PaginatedResponseTB303PatternSummaryRecordsItem[] =
  Array.from({ length: 100 }, (_, index) => ({
    pattern_id: `uuid-${index}`,
    name: `Pattern ${index + 1}`,
    is_public: index % 2 === 0,
    updated_at: new Date(
      Date.now() - Math.floor(Math.random() * 1_000_000_000),
    ).toISOString(),
    user_id: `user-${index}`,
    created_at: new Date().toISOString(),
  }));

const meta: Meta<
  DataTableProps<PaginatedResponseTB303PatternSummaryRecordsItem, unknown>
> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <div className="flex h-screen bg-background p-4 text-foreground">
            <Story />
          </div>
        </NuqsAdapter>
      </QueryClientProvider>
    ),
  ],
  render: function Render(arguments_) {
    if (arguments_.data) {
      return <DataTable {...arguments_} />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { filters } = useDataTableFilters();
    const { search, isPublic, sortColumn, sortDirection, page, pageSize } =
      filters;

    const filteredData = initialMockData.filter(item => {
      const searchMatch = search
        ? item.name.toLowerCase().includes(search.toLowerCase())
        : true;
      const visibilityMatch =
        isPublic === undefined ? true : item.is_public === isPublic;
      return searchMatch && visibilityMatch;
    });

    if (sortColumn && sortDirection) {
      filteredData.sort((a, b) => {
        const aValue = a[sortColumn as keyof typeof a] ?? '';
        const bValue = b[sortColumn as keyof typeof b] ?? '';

        if (aValue < bValue) {
          return sortDirection === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredData.slice(start, end);

    return (
      <DataTable {...arguments_} data={paginatedData} totalPages={totalPages} />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    totalPages: 0,
    isLoading: false,
  },
};
