import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { TutorModel } from '@/models';
import { TutorCreate, TutorTable } from '.';

export const TutorView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<TutorModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Tutores</Typography>
        <ComponentButton
          text="Nuevo Tutor"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <TutorTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />
      {openDialog && (
        <TutorCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
