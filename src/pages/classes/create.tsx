import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { CreateView } from '@/components/refine-ui/views/create-view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useBack, useList } from '@refinedev/core'
import type { HttpError } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import type { ControllerRenderProps } from "react-hook-form"
import { classSchema } from '@/lib/schema'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import type { Subject, UploadWidgetValue, User } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { subjects, teachers } from '@/providers/mock-data'
import UploadWidget from '@/components/upload-widget'
const Create = () => {
    const back = useBack();
        const form = useForm<z.infer<typeof classSchema>, HttpError, z.infer<typeof classSchema>>({
                resolver: zodResolver(classSchema),
                refineCoreProps: {
                        resource: "classes",
                        action: "create",
                },
                defaultValues: {
                        name: '',
                        description: '',
                        subjectId: 0,
                        teacherId: '',
                        capacity: 0,
                        status: 'active',
                        bannerUrl: '',
                        bannerCldPubId: '',
                        inviteCode: '',
                        schedules: [],
                },
        });

    const {
        refineCore:{onFinish},
         handleSubmit,
         control,
         formState: { errors } 
        } = form;
    const onSubmit = async (values: z.infer<typeof classSchema>): Promise<void> => {
        try {
            await onFinish(values);
        } catch (error) {
            console.log('Error creating new classes', error);
        }
    }
    const { query: subjectsQuery } = useList<Subject>({
        resource:'subjects',
        pagination:{
            pageSize:100
        }
    })
    const {query:teachersQuery} = useList<User>({
        resource:'users',
        filters:[
            {field:'role',operator:'eq',value:'teacher'},
        ],
        pagination:{
            pageSize:100
        }
    })
    const subjects=subjectsQuery?.data?.data || [];
    const subjectsLoading=subjectsQuery.isLoading;

    const teachers=teachersQuery?.data?.data || [];
    const teachersLoading=teachersQuery.isLoading;

    const bannerPublicId = form.watch('bannerCldPubId');
    
    const setBannerImage = (
        field: ControllerRenderProps<z.infer<typeof classSchema>, 'bannerUrl'>,
        file: UploadWidgetValue | null,
    ) => {
        if (file) {
            field.onChange(file.url);
            form.setValue('bannerCldPubId', file.publicId, {
                shouldValidate: true,
                shouldDirty: true,
            })
        } else {
            field.onChange('');
            form.setValue('bannerCldPubId', '', {
                shouldValidate: true,
                shouldDirty: true
            })
        }
    }
    return (
        <CreateView className="class-view">
            <Breadcrumb />
            <h1 className='page-title'>Create a Class</h1>
            <div className="intro-row">
                <p>Provide the required information below to a class.</p>
                <Button onClick={back}>
                    Go Back
                </Button>
            </div>
            <Separator />
            <div className='my-4 flex items-center'>
                <Card className="class-form-card">
                    <CardHeader className='relative z-10'>
                        <CardTitle className='text-2xl pb-0 font-bold'>
                            Fill out the form
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className='mt-7'>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)}
                                className='space-y-5'>
                                <FormField
                                    control={control}
                                    name="bannerUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Banner Image
                                            </FormLabel>
                                            <FormControl>
                                                <UploadWidget
                                                    value={field.value ? {
                                                        url:
                                                            field.value, publicId:
                                                            bannerPublicId ?? ''
                                                    } : null}
                                                    onChange={(value) => setBannerImage(field, value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.bannerCldPubId && !errors.bannerUrl && (
                                                <p>{errors.bannerCldPubId.message?.toString()}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Class Name  <span className='text-orange-600'></span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Introduction to Biology - Section A"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <FormField
                                        control={control}
                                        name="subjectId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject <span className='text-orange-600'></span></FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => field.onChange(Number(value))}
                                                     value={field?.value?.toString()}
                                                     disabled={subjectsLoading}>
                                                        <FormControl>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Select a subject" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {subjects.map(
                                                                (subject) => (
                                                                    <SelectItem
                                                                        value={subject.id.toString()}>
                                                                        {subject.name}
                                                                        ({subject.code})
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={control}
                                    name="teacherId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Teacher <span className='text-orange-600'></span></FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value) => field.onChange(Number(value))}
                                                 value={field?.value?.toString()}
                                                 disabled={teachersLoading}>
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select a teacher" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {teachers.map(
                                                            (teacher) => (
                                                                <SelectItem
                                                                    value={teacher.id.toString()}>
                                                                    {teacher.name}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </CreateView>

    )
}

export default Create