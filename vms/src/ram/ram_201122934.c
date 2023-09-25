#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/hugetlb.h>
#include <linux/sched.h>
#include <linux/mm.h>
#include <linux/mmzone.h>  // Necesario para obtener la información de meminfo

//Agregar los %
//Los datos estan mb

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Ver metricas de RAM");
MODULE_AUTHOR("Marco Antonio Xocop Roquel");
MODULE_VERSION("1.0");

struct task_struct * cpu;
struct task_struct * child;
struct list_head * lstProcess;

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct sysinfo si;
    si_meminfo(&si);

    // Convertir total RAM de kilobytes a gigabytes
    unsigned long total_ram_gb = si.totalram*4096/(1024*1024);  // Dividir por 1024^3

    // Calcular RAM utilizada como total - (libre + caché)
    unsigned long used_ram = (si.totalram - (si.freeram + si.bufferram))*4096/(1024*1024);
    
    // Calcular porcentaje de RAM utilizada
    unsigned long porcentaje_en_uso = used_ram * 100 / total_ram_gb;

    seq_printf(archivo, "{\n\"ram\": {\n\"ram_total\":%lu,\n \"ram_usada\":%lu,\n \"ram_libre\":%lu,\n \"ram_cache\":%lu ,\n \"ram_porcentaje_en_uso\":%lu\n",
               total_ram_gb, used_ram, si.freeram *4096/(1024*1024) , si.bufferram*4096/(1024*1024), porcentaje_en_uso);

    // seq_printf(archivo, "\n}");
    seq_printf(archivo, ",\n");
    return 0;
}

static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("ram_201122934", 0, NULL, &operaciones);
    printk(KERN_INFO "Carné: 201122934 \n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("ram_201122934", NULL);
    printk(KERN_INFO "Nombre: Marco Antonio Xocop Roquel\n");
}

module_init(_insert);
module_exit(_remove);