<!-- sidebar -->
<div id="sidebar" class="">
    @php
        $user = \Illuminate\Support\Facades\Auth::user();
        $user_rankings = \App\Models\Ranking::where('rank_lavel', $user->last_lavel)->first();
    @endphp

    <div class="sidebar-top">
        <a class="navbar-brand" href="{{route('home')}}"> <img
                src="{{getFile(config('location.logoIcon.path').'logo.png')}}" alt="@lang('brand logo')"></a>
        <button class="sidebar-toggler d-lg-none" onclick="toggleSideMenu()">
            <i class="fal fa-times"></i>
        </button>
    </div>
    @if($user->last_lavel != null && $user_rankings)
        <div class="level-box">
            <div>
                <h4>@lang(@$user_rankings->rank_lavel)</h4>
                <p class="mb-0">@lang(@$user_rankings->rank_name)</p>
            </div>
            <img src="{{ getFile(config('location.rank.path').@$user_rankings->rank_icon) }}" alt="@lang('level image')" class="level-badge">
        </div>
    @endif
    <div class="wallet-wrapper m-4">
        <div class="wallet-box">
            <h4>@lang('Account Balance')</h4>
            <span class="tag">{{ $basic->currency }}</span>
            <ul>
                <li><img src="{{ asset($themeTrue.'img/icon/base_currency.png') }}" alt="">  @lang('Main Balance') <span>{{ $basic->currency_symbol }}{{ @$user->balance }}</span></li>
                <li><img src="{{ asset($themeTrue.'img/icon/base_currency.png') }}" alt=""> @lang('Interest Balance') <span>{{ $basic->currency_symbol }}{{ @$user->interest_balance }}</span></li>
            </ul>
        </div>

        <div class="d-flex justify-content-between mt-3">
            <a class="btn btn-primary" href="{{ route('user.addFund') }}"><i class="fal fa-wallet" aria-hidden="true"></i> @lang('Deposit') </a>
            <a class="btn btn-primary" href="{{ route('plan') }}"><i class="fal fa-usd-circle" aria-hidden="true"></i> @lang('Invest') </a>
        </div>
    </div>

    <ul class="main">
        <li>
            <a class="{{menuActive('user.home')}}" href="{{route('user.home')}}"><i class="fal fa-th-large"></i>@lang('dashboard')</a>
        </li>

        <li>
            <a href="{{route('plan')}}" class="{{menuActive(['plan'])}}"><i class="fal fa-clipboard-list"></i> @lang('Plan')</a>
        </li>

        <li>
            <a href="{{route('user.invest-history')}}" class="sidebar-link {{menuActive(['user.invest-history'])}}">
                <i class="fal fa-file-medical-alt"></i> @lang('invest history')
            </a>
        </li>

        <li>
            <a href="{{route('user.addFund')}}"
               class="sidebar-link {{menuActive(['user.addFund', 'user.addFund.confirm'])}}">
                <i class="far fa-funnel-dollar"></i> @lang('Add Fund')
            </a>
        </li>
        <li>
            <a href="{{route('user.fund-history')}}"
               class="sidebar-link {{menuActive(['user.fund-history', 'user.fund-history.search'])}}">
                <i class="far fa-search-dollar"></i> @lang('Fund History')
            </a>
        </li>
        <li>
            <a href="{{route('user.money-transfer')}}" class="sidebar-link {{menuActive(['user.money-transfer'])}}">
                <i class="far fa-money-check-alt"></i> @lang('transfer')
            </a>
        </li>
        <li>
            <a href="{{route('user.transaction')}}"
               class="sidebar-link {{menuActive(['user.transaction', 'user.transaction.search'])}}">
                <i class="far fa-sack-dollar"></i> @lang('transaction')
            </a>
        </li>
        <li>
            <a href="{{route('user.payout.money')}}"
               class="sidebar-link {{menuActive(['user.payout.money','user.payout.preview'])}}">
                <i class="fal fa-hand-holding-usd"></i> @lang('payout')
            </a>
        </li>
        <li>
            <a href="{{route('user.payout.history')}}"
               class="sidebar-link {{menuActive(['user.payout.history','user.payout.history.search'])}}">
                <i class="far fa-badge-dollar"></i> @lang('payout history')
            </a>
        </li>
        <li>
            <a href="{{route('user.referral')}}" class="sidebar-link {{menuActive(['user.referral'])}}">
                <i class="fal fa-retweet-alt"></i> @lang('my referral')
            </a>
        </li>
        <li>
            <a href="{{route('user.referral.bonus')}}"
               class="sidebar-link {{menuActive(['user.referral.bonus', 'user.referral.bonus.search'])}}">
                <i class="fal fa-box-usd"></i> @lang('referral bonus')
            </a>
        </li>
        <li>
            <a href="{{route('user.badges')}}" class="sidebar-link {{menuActive(['user.badges'])}}">
                <i class="fal fa-badge"></i> @lang('Badges')
            </a>
        </li>
        <li>
            <a href="{{route('user.ticket.list')}}"
               class="sidebar-link {{menuActive(['user.ticket.list', 'user.ticket.create', 'user.ticket.view'])}}">
                <i class="fal fa-user-headset"></i> @lang('support ticket')
            </a>
        </li>
        <li>
            <a href="{{route('user.profile')}}" class="sidebar-link {{menuActive(['user.profile'])}}">
                <i class="fal fa-user"></i> @lang('profile settings')
            </a>
        </li>

        <li class="d-lg-none">
            <a href="{{route('user.twostep.security')}}">
                <i class="fal fa-lock"></i> @lang('2FA Security')
            </a>
        </li>
    </ul>
</div>