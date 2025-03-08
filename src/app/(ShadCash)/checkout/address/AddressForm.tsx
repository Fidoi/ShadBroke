'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddressStore, useCartStore, useFormStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Region } from '@/interfaces';
import { placeOrder, setUserAddress } from '@/actions';
import { useSession } from 'next-auth/react';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  region: string;
  provincia: string;
  comuna: string;
  phone: string;
  rememberAddress: boolean;
};

interface Props {
  regiones: Region[];
}

export const AddressForm = ({ regiones }: Props) => {
  const productsInCart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const form = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      region: '',
      provincia: '',
      comuna: '',
      phone: '',
      rememberAddress: false,
    },
    resolver: zodResolver(
      z.object({
        firstName: z.string().min(1, 'El nombre es obligatorio'),
        lastName: z.string().min(1, 'El apellido es obligatorio'),
        address: z.string().min(1, 'La dirección es obligatoria'),
        region: z.string().min(1, 'La región es obligatoria'),
        provincia: z.string().min(1, 'La provincia es obligatoria'),
        comuna: z.string().min(1, 'La comuna es obligatoria'),
        phone: z.string().min(1, 'El teléfono es obligatorio'),
        rememberAddress: z.boolean().default(false),
      })
    ),
  });

  const { control, setValue, watch, register } = form;

  const [provincias, setProvincias] = useState<
    { id: number; nombre: string; comunas: { id: number; nombre: string }[] }[]
  >([]);
  const [comunas, setComunas] = useState<{ id: number; nombre: string }[]>([]);

  const { data: session } = useSession({
    required: true,
  });
  const watchedRegion = watch('region');
  const watchedProvincia = watch('provincia');

  useEffect(() => {
    const regionId = watch('region');
    if (regionId) {
      const selectedRegion = regiones.find((r) => r.id.toString() === regionId);
      if (selectedRegion) {
        setProvincias(selectedRegion.provincias);
        setValue('provincia', '');
        setComunas([]);
        setValue('comuna', '');
      }
    } else {
      setProvincias([]);
      setComunas([]);
      setValue('provincia', '');
      setValue('comuna', '');
    }
  }, [watchedRegion, regiones, setValue, watch]);

  useEffect(() => {
    const provinciaId = watch('provincia');
    if (provinciaId) {
      const selectedProvincia = provincias.find(
        (p) => p.id.toString() === provinciaId
      );
      if (selectedProvincia) {
        setComunas(selectedProvincia.comunas);
        setValue('comuna', '');
      }
    } else {
      setComunas([]);
      setValue('comuna', '');
    }
  }, [watchedProvincia, provincias, setValue, watch]);
  const onSubmit = useCallback(
    async (data: FormData) => {
      const { rememberAddress, ...restAddress } = data;
      const selectedRegion = regiones.find(
        (r) => r.id.toString() === restAddress.region
      );
      const selectedProvincia = selectedRegion?.provincias.find(
        (p) => p.id.toString() === restAddress.provincia
      );
      const selectedComuna = selectedProvincia?.comunas.find(
        (c) => c.id.toString() === restAddress.comuna
      );
      if (!selectedRegion || !selectedProvincia || !selectedComuna) {
        return;
      }
      const addressData = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        address2: data.address2 || '',
        region: selectedRegion!,
        provincia: selectedProvincia!,
        comuna: selectedComuna!,
        phone: data.phone,
      };

      useAddressStore.getState().setAddress(addressData);
      const productsToOrder = productsInCart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      }));

      const resp = await placeOrder(productsToOrder, addressData);
      if (!resp) {
        return;
      }
      if (rememberAddress) {
        setUserAddress(addressData, session!.user.id);
      }
      clearCart();
    },
    [clearCart, productsInCart, regiones, session]
  );
  useEffect(() => {
    useFormStore.getState().setIsFormValid(form.formState.isValid);
  }, [form.formState.isValid]);
  useEffect(() => {
    useFormStore.getState().setSubmitForm(form.handleSubmit(onSubmit));
  }, [form, onSubmit]);
  if (productsInCart.length === 0) return;
  return (
    <div className={`grid grid-cols-1 gap-8 `}>
      <Card className={`w-full`}>
        <CardHeader>
          <CardTitle>Dirección de Facturación</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Nombre*</Label>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('firstName', { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Apellido*</Label>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('lastName', { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Dirección*</Label>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('address', { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name='address2'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Dirección 2</Label>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('address2', { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={control}
                  name='region'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Región</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione región' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regiones.map((region) => (
                            <SelectItem
                              key={region.id}
                              value={region.id.toString()}
                              {...register('region', { required: true })}
                            >
                              {region.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name='provincia'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Provincia</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione Provincia' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provincias.map((provincia) => (
                            <SelectItem
                              key={provincia.id}
                              value={provincia.id.toString()}
                              {...register('provincia', { required: true })}
                            >
                              {provincia.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name='comuna'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Comuna</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione Comuna' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {comunas.map((comuna) => (
                            <SelectItem
                              key={comuna.id}
                              value={comuna.id.toString()}
                              {...register('comuna', { required: true })}
                            >
                              {comuna.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <Label>Teléfono*</Label>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('phone', { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex items-center space-x-2'>
                <FormField
                  control={control}
                  name='rememberAddress'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center space-x-2'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label htmlFor='rememberAddress'>
                          Guardar direccion
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
