'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  ChevronDown 
} from 'lucide-react';
import moment from 'moment';
import { DateRange } from 'react-day-picker';

export enum ReportStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  PENDING_PAYMENT = 'pending_payment',
  COMPLETE = 'complete',
}

const ReportsActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [statusFilter, setStatusFilter] = useState<ReportStatus[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<boolean | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Initialize state from URL params on component mount
  useEffect(() => {
    const status = searchParams.get('status');
    const isPaid = searchParams.get('is_paid');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (status) {
      const statusArray = status.split(',').filter(s => 
        Object.values(ReportStatus).includes(s as ReportStatus)
      ) as ReportStatus[];
      setStatusFilter(statusArray);
    }

    if (isPaid === 'true') {
      setPaymentFilter(true);
    } else if (isPaid === 'false') {
      setPaymentFilter(false);
    }

    if (startDate && endDate) {
      setDateRange({
        from: moment(startDate).toDate(),
        to: moment(endDate).toDate(),
      });
    }
  }, [searchParams]);

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : '';
    
    router.push(`${pathname}${query}`);
  }, [searchParams, pathname, router]);

  const handleStatusFilter = (status: ReportStatus) => {
    const newStatusFilter = statusFilter.includes(status)
      ? statusFilter.filter(s => s !== status)
      : [...statusFilter, status];
    
    setStatusFilter(newStatusFilter);
    updateURL({ status: newStatusFilter.length > 0 ? newStatusFilter.join(',') : null , page: '1' , limit: '10' });
  };

  const handlePaymentFilter = (isPaid: boolean) => {
    const newPayment = paymentFilter === isPaid ? null : isPaid;
    setPaymentFilter(newPayment);
    updateURL({ is_paid: newPayment?.toString() || null , limit: '10', page: '1' });
  };

  const handleDateRangeFilter = (range: DateRange | undefined) => {
    setDateRange(range);
    
    if (range?.from && range?.to) {
      updateURL({
        limit: '10',
        page: '1',
        start_date: moment(range.from).format('YYYY-MM-DD'),
        end_date: moment(range.to).format('YYYY-MM-DD'),
      });
    } else {
      updateURL({
        limit: '10',
        page: '1',
        start_date: null,
        end_date: null,
      });
    }
  };

  const clearIndividualFilter = (filterType: 'status' | 'payment' | 'date') => {
    switch (filterType) {
      case 'status':
        setStatusFilter([]);
        updateURL({ status: null, limit: '10', page: '1' });
        break;
      case 'payment':
        setPaymentFilter(null);
        updateURL({ is_paid: null, limit: '10', page: '1' });
        break;
      case 'date':
        setDateRange(undefined);
        updateURL({ start_date: null, end_date: null, limit: '10', page: '1' });
        break;
    }
  };

  const clearAllFilters = () => {
    setStatusFilter([]);
    setPaymentFilter(null);
    setDateRange(undefined);
    updateURL({
      page: '1',
      limit: '10',
      status: null,
      is_paid: null,
      start_date: null,
      end_date: null,
    });
  };

  const getStatusDisplayName = (status: ReportStatus) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const hasActiveFilters = statusFilter.length > 0 || paymentFilter !== null || dateRange;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>

      {/* Status Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            Status
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {Object.values(ReportStatus).map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`cursor-pointer ${
                statusFilter.includes(status) ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={statusFilter.includes(status)}
                  onChange={() => {}}
                  className="mr-2 h-3 w-3"
                />
                {getStatusDisplayName(status)}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Payment Status Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            Payment Status
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuItem
            onClick={() => handlePaymentFilter(true)}
            className={`cursor-pointer ${
              paymentFilter === true ? 'bg-blue-50 text-blue-700' : ''
            }`}
          >
            Paid
            {paymentFilter === true && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handlePaymentFilter(false)}
            className={`cursor-pointer ${
              paymentFilter === false ? 'bg-blue-50 text-blue-700' : ''
            }`}
          >
            Unpaid
            {paymentFilter === false && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <CalendarIcon className="mr-2 h-3 w-3" />
            Date Range
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeFilter}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Active:</span>
          
          {statusFilter.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {statusFilter.map((status) => (
                <Badge key={status} variant="secondary" className="text-xs">
                  {getStatusDisplayName(status)}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusFilter(status);
                    }}
                    className="ml-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {paymentFilter !== null && (
            <Badge variant="secondary" className="text-xs">
              {paymentFilter ? 'Paid' : 'Unpaid'}
              <button
                onClick={() => clearIndividualFilter('payment')}
                className="ml-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {dateRange?.from && dateRange?.to && (
            <Badge variant="secondary" className="text-xs">
              {moment(dateRange.from).format('MMM DD')} - {moment(dateRange.to).format('MMM DD')}
              <button
                onClick={() => clearIndividualFilter('date')}
                className="ml-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportsActions;