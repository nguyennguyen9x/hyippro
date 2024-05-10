<!-- PAGE-BANNER -->
<style>
    .banner-section {
        background-image: url(<?php echo e(getFile(config('location.logo.path').'pertial_banner.jpg')); ?>) !important;
    }
</style>

<?php if(!request()->routeIs('home')): ?>
    <!-- banner section -->
    <section class="banner-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h3><?php echo $__env->yieldContent('title'); ?></h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="<?php echo e(route('home')); ?>"><?php echo app('translator')->get('Home'); ?></a></li>
                            <li class="breadcrumb-item active" aria-current="page"><?php echo $__env->yieldContent('title'); ?></li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>
<?php /**PATH E:\OT\projects\web-hyippro-php\resources\views/themes/lightagro/partials/banner.blade.php ENDPATH**/ ?>