'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// import InvoiceEditButton from '@/app/_components/buttons/InvoiceEditButton';
// import InvoiceDeleteButton from '@/app/_components/buttons/invoiceDeleteButton';
import { IUser } from '@/app/types/interfaces';
import { EllipsisVertical } from 'lucide-react';

const UserFormActions = ({ user }: { user: IUser }) => {
  enum Dialogs {
    delete = 'delete',
    permanentDelete = 'permanentDelete',
  }

  const [dialog, setDialog] = useState<Dialogs>();
  return (
    <div className="flex justify-center gap-4">
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white flex flex-col">
            <DropdownMenuItem className="cursor-pointer">
              {/* <InvoiceEditButton user={user} /> */}
            </DropdownMenuItem>
            <AlertDialogTrigger
              onClick={() => {
                setDialog(Dialogs.delete);
              }}
            >
              <DropdownMenuItem className="cursor-pointer">Delete Invoice</DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogTrigger
              onClick={() => {
                setDialog(Dialogs.permanentDelete);
              }}
            >
              <DropdownMenuItem className="cursor-pointer">Permanent Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </AlertDialog>
    </div>
  );
};

export default UserFormActions;
