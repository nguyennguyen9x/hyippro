<!-- navbar -->
<nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
        <a class="navbar-brand" href="<?php echo e(url('/')); ?>"> <img src="<?php echo e(getFile(config('location.logoIcon.path').'logo.png')); ?>"
                                                          alt=""/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fal fa-bars-staggered"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link <?php echo e(Request::routeIs('home') ? 'active' : ''); ?>"
                       href="<?php echo e(route('home')); ?>"><?php echo app('translator')->get('Home'); ?></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo e(Request::routeIs('about') ? 'active' : ''); ?>"
                       href="<?php echo e(route('about')); ?>"><?php echo app('translator')->get('About'); ?></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo e(Request::routeIs('plan') ? 'active' : ''); ?>"
                       href="<?php echo e(route('plan')); ?>"><?php echo app('translator')->get('Plan'); ?></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo e(Request::routeIs('blog') ? 'active' : ''); ?>"
                       href="<?php echo e(route('blog')); ?>"><?php echo app('translator')->get('Blogs'); ?></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo e(Request::routeIs('faq') ? 'active' : ''); ?>"
                       href="<?php echo e(route('faq')); ?>"><?php echo app('translator')->get('FAQ'); ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link <?php echo e(Request::routeIs('contact') ? 'active' : ''); ?>"
                       href="<?php echo e(route('contact')); ?>"><?php echo app('translator')->get('Contact'); ?></a>
                </li>
            </ul>
        </div>


        <!-- navbar text -->
        <div class="navbar-text" id="pushNotificationArea">
            <!-- notification panel -->

            <?php echo $__env->make($theme.'partials.pushNotify', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

            <!-- user panel -->
            <?php if(auth()->guard()->check()): ?>
                <div class="notification-panel user-panel">
                    <div class="profile">
                        <img src="<?php echo e(getFile(config('location.user.path').auth()->user()->image)); ?>" class="img-fluid" alt="<?php echo app('translator')->get('user img'); ?>"/>
                    </div>
                    <ul class="user-dropdown">
                        <li>
                            <a href="<?php echo e(route('user.home')); ?>"> <i class="fal fa-border-all"
                                                                 aria-hidden="true"></i> <?php echo app('translator')->get('Dashboard'); ?> </a>
                        </li>
                        <li>
                            <a href="<?php echo e(route('user.profile')); ?>"> <i class="fal fa-user"></i> <?php echo app('translator')->get('My Profile'); ?> </a>
                        </li>
                        <li>
                            <a href="<?php echo e(route('user.twostep.security')); ?>"> <i
                                    class="fal fa-key"></i> <?php echo app('translator')->get('2FA Security'); ?> </a>
                        </li>
                        <li>
                            <a href="<?php echo e(route('logout')); ?>" onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();"> <i
                                    class="fal fa-sign-out-alt"></i> <?php echo app('translator')->get('Log Out'); ?> </a>
                            <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" class="d-none">
                                <?php echo csrf_field(); ?>
                            </form>
                        </li>
                    </ul>
                </div>
            <?php endif; ?>


            <?php if(auth()->guard()->guest()): ?>
                    <a class="btn-custom" href="<?php echo e(route('login')); ?>"><?php echo app('translator')->get('Login'); ?></a>
            <?php endif; ?>
        </div>
    </div>
</nav>
<?php /**PATH E:\OT\projects\web-hyippro-php\resources\views/themes/lightagro/partials/topbar.blade.php ENDPATH**/ ?>