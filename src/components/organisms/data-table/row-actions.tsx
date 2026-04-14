'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeletePattern } from '@/features/pattern-tb303-editor/delete-pattern';

interface RowActionsProps {
  editLink: string;
  patternId: string;
  patternName: string;
  onDeleteSuccess?: () => void;
}

export function RowActions({
  editLink,
  patternId,
  patternName,
  onDeleteSuccess,
}: RowActionsProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteOpen = () => setIsDeleteOpen(true);
  const handleDeleteClose = () => setIsDeleteOpen(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 data-[state=open]:bg-muted"
            onClick={event => event.stopPropagation()}
          >
            <Icons.MoreHorizontalSharp className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href={editLink}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteOpen}
            className="text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeletePattern
        patternId={patternId}
        patternName={patternName}
        isOpen={isDeleteOpen}
        onClose={handleDeleteClose}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
